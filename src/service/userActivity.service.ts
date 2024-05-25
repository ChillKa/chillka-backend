import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import Activity from '../model/activity.model';
import Ticket from '../model/ticket.model';
import User from '../model/user.model';
import {
  AttendActivityParams,
  GetActivitiesParams,
  GetActivityParticipantParams,
} from '../type/activity.type';
import { TicketStatusEnum } from '../type/ticket.type';
import { CoreError } from '../util/error-handler';
import { mockActivity } from '../util/mock/data';
import { paginator } from '../util/paginator';

export const createActivity = async (
  userId: mongoose.Types.ObjectId | undefined
) => {
  if (!userId)
    throw new CoreError('Unable to create activity without user id.');

  const updatedActivity = new Activity({
    ...mockActivity,
    creatorId: userId,
  });

  try {
    await updatedActivity.save();

    return updatedActivity;
  } catch (error) {
    throw new CoreError('Create activity failed.');
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
  const activity = await Activity.findById(activityId).populate('tickets');

  if (!activity) {
    throw new CoreError('Activity not found.');
  }

  if (activity.tickets?.some((i) => i.userId.equals(userId))) {
    throw new CoreError('The user already attended the activity.');
  }

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
    const userIds = (await Ticket.find({ activityId })).map((i) => i.userId);
    const users = await User.find({ _id: { $in: userIds } }).select(
      '-password'
    );

    const paginatedData = paginator(users ?? [], page, limit);

    return paginatedData;
  } catch (error) {
    throw new CoreError('Get participant list failed.');
  }
};
