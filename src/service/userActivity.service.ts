import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import Activity from '../model/activity.model';
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
  const activity = await Activity.findById(activityId);

  if (!activity) {
    throw new CoreError('Activity not found.');
  }

  if (activity.tickets?.some((i) => i.userId.equals(userId))) {
    throw new CoreError('User is already a participant.');
  }

  activity.tickets?.push({
    userId,
    activityId,
    serialNumber: faker.string.uuid(),
    ticketStatus: TicketStatusEnum.VALID,
    ...requestBody,
  });

  await activity.save();

  return activity;
};

export const getParticipantList = async ({
  activityId,
  page,
  limit,
}: GetActivityParticipantParams) => {
  try {
    if (!activityId)
      throw new CoreError(
        'Unable to get participant list without activity id.'
      );

    const activity = await Activity.findById(activityId).populate('tickets');

    if (!activity) throw new CoreError('Activity not found.');
    const paginatedData = paginator(activity.tickets ?? [], page, limit);
    return paginatedData;
  } catch (error) {
    throw new CoreError('Get participant list failed.');
  }
};
