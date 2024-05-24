import mongoose from 'mongoose';
import Activity from '../model/activity.model';
import { GetActivitiesParams, StatusEnum } from '../type/activity.type';
import { CoreError } from '../util/error-handler';
import { mockActivity } from '../util/mock/data';
import { paginator } from '../util/paginator';

export const create = async (userId: mongoose.Types.ObjectId | undefined) => {
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

export const get = async ({
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

export const cancel = async (activityId: mongoose.Types.ObjectId) => {
  try {
    if (!activityId)
      throw new CoreError('Unable to cancel activity without activity id.');

    const activity = await Activity.findByIdAndUpdate(
      activityId,
      { status: StatusEnum.CANCELLED },
      { new: true }
    );

    return activity;
  } catch (error) {
    throw new CoreError('Cancel activity failed.');
  }
};
