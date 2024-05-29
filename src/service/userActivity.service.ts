import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import Activity from '../model/activity.model';
import Ticket from '../model/ticket.model';
import User from '../model/user.model';
import {
  ActivityCreateCredentials,
  ActivityEditCredentials,
  AttendActivityParams,
  CancelActivityParams,
  CollectActivityParams,
  GetActivitiesParams,
  GetActivityParticipantParams,
  GetSavedActivityParams,
  StatusEnum,
} from '../type/activity.type';
import { TicketStatusEnum } from '../type/ticket.type';
import { CoreError } from '../util/error-handler';
import { paginator } from '../util/paginator';

export const createActivity = async ({
  tickets,
  ...activityData
}: ActivityCreateCredentials) => {
  const newActivity = new Activity(activityData);
  try {
    await newActivity.save();
    const newTickets = tickets?.map((ticket) => {
      ticket.activityId = newActivity._id;
      return ticket;
    });
    await Ticket.insertMany(newTickets);

    return newActivity;
  } catch (error) {
    throw new CoreError('Create activity failed.');
  }
};

export const editActivity = async ({
  creatorId,
  activityId,
  tickets,
  ...activityData
}: ActivityEditCredentials) => {
  try {
    const existingActivity = await Activity.findById(activityId);
    if (!existingActivity?.creatorId.equals(creatorId))
      throw new CoreError('Unable to edit activity without creator.');
    await existingActivity.updateOne(activityData);

    // the tickets have three conditions:
    //   1. with _id
    //      - _id is existing tickets (update)
    //      - _id is not existing tickets (throw new Error)
    //   2. without _id
    //      - create new tickets
    //   3. the existing tickets' _id are not pass to backend
    //      - delete the existing tickets

    const existingTicketIds = (
      await Ticket.find({ activityId }).select('_id')
    ).map((ticket) => ticket._id.toString());

    for (const ticket of tickets) {
      if (ticket?._id) {
        // 1. check if the ticket already exists and update it
        const ticketIndex = existingTicketIds.indexOf(ticket?._id.toString());
        if (ticketIndex === -1)
          throw new CoreError('Unable to edit ticket without wrong id.');
        await Ticket.findByIdAndUpdate({ _id: ticket._id }, ticket);
        existingTicketIds.splice(ticketIndex, 1);
      } else {
        // 2. create new ticket
        ticket.activityId = new mongoose.Types.ObjectId(activityId);
        await Ticket.create(ticket);
      }
    }

    if (existingTicketIds.length) {
      // 3. delete the existing ticket
      await Ticket.deleteMany({ _id: { $in: existingTicketIds } });
    }

    return { message: 'success update' };
  } catch (error) {
    throw new CoreError('Edit activity failed.');
  }
};

export const getActivityList = async ({
  userId,
  page,
  limit,
  sort,
}: GetActivitiesParams) => {
  try {
    if (!userId)
      throw new CoreError('Unable to get activities without user id.');

    const activities = await Activity.find({
      creatorId: userId,
    }).sort({
      createdAt: sort === 'des' ? -1 : 1,
    });

    const paginatedData = paginator(activities, page, limit);

    return paginatedData;
  } catch (error) {
    throw new CoreError('Get activities failed.');
  }
};

export const attendActivity = async ({
  userId,
  activityId,
  requestBody,
}: AttendActivityParams) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new CoreError('User not found.');
  }

  if (!user.isEmailValidate) {
    throw new CoreError('User email not validated.');
  }

  const activity = await Activity.findById(activityId).populate('tickets');

  if (!activity) {
    throw new CoreError('Activity not found.');
  }

  // if (activity.tickets?.some((i) => i.userId.equals(userId))) {
  //   throw new CoreError('The user already attended the activity.');
  // }

  try {
    await Ticket.create({
      userId,
      activityId,
      serialNumber: faker.string.uuid(),
      ticketStatus: TicketStatusEnum.VALID,
      ...requestBody,
    });
    return { message: 'Attend activity success.' };
  } catch (error) {
    throw new CoreError('Attend activity failed.');
  }
};

export const getParticipantList = async ({
  activityId,
  participantName,
  page,
  limit,
}: GetActivityParticipantParams) => {
  if (!activityId) {
    throw new CoreError('Unable to get participant list without activity id.');
  }

  const activity = await Activity.findById(activityId).populate('tickets');
  if (!activity) {
    throw new CoreError('Activity not found.');
  }

  try {
    const data = await Ticket.find({
      activityId,
      'userInfo.name': new RegExp(participantName ?? '', 'i'),
    }).select([
      '-_id',
      'userId',
      'userInfo',
      'payment',
      'ticketStatus',
      'serialNumber',
    ]);

    const paginatedData = paginator(data ?? [], page, limit);

    return paginatedData;
  } catch (error) {
    throw new CoreError('Get participant list failed.');
  }
};

export const cancelActivity = async ({
  activityId,
  userId,
}: CancelActivityParams) => {
  if (!activityId)
    throw new CoreError('Unable to cancel activity without activity id.');

  const activity = await Activity.findById(activityId);

  if (!userId?.equals(activity?.creatorId)) {
    throw new CoreError('Unauthorized to cancel activity.', 403);
  }

  activity?.$set({ status: StatusEnum.CANCELLED });
  await activity?.save();

  return activity;
};

export const collectActivity = async ({
  activityId,
  userId,
}: CollectActivityParams) => {
  if (!activityId) {
    throw new CoreError('Unable to collect activity without activity id.');
  }

  const activity = await Activity.findById(activityId);
  if (!activity) {
    throw new CoreError('Activity not found.');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new CoreError('User not found.');
  }

  try {
    if (user.savedActivities?.includes(activityId)) {
      user.savedActivities = user.savedActivities.filter(
        (_id) => !_id.equals(activityId)
      );
    } else {
      user.savedActivities?.push(activityId);
    }
    await user?.save();

    return { message: 'Collect activity success.' };
  } catch (error) {
    throw new CoreError('Collect activity failed.');
  }
};

export const getSavedActivityList = async ({
  userId,
  page,
  limit,
  sort,
}: GetSavedActivityParams) => {
  if (!userId) {
    throw new CoreError('Unable to get saved activity list without user id.');
  }

  try {
    const user = await User.findById(userId)
      .populate('savedActivities')
      .sort({
        createdAt: sort === 'des' ? -1 : 1,
      });
    const data = user?.savedActivities;
    const paginatedData = paginator(data ?? [], page, limit);

    return paginatedData;
  } catch (error) {
    throw new CoreError('Get saved activity list failed.');
  }
};
