import Activity from '../model/activity.model';
import { GetActivitiesParams } from '../type/activity.type';
import { CoreError } from '../util/error-handler';
import { mockActivity } from '../util/mock/data';

export const create = async (userId: string) => {
  const activity = new Activity({
    ...mockActivity,
    creatorId: userId,
  });

  try {
    const updatedActivity = await Activity.findOneAndUpdate(
      { creatorId: userId },
      { $push: { activities: activity } },
      { new: true, upsert: true }
    );

    return updatedActivity;
  } catch (error) {
    throw new CoreError('Create activity failed.');
  }
};

export const get = async (params: GetActivitiesParams) => {
  try {
    const activities = await Activity.findOne({
      creatorId: params.userId,
    });

    return activities;
  } catch (error) {
    throw new CoreError('Get activities failed.');
  }
};
