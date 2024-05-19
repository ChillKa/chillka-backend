import Activity from '../model/activity.model';
import { GetActivitiesParams } from '../type/activity.type';
import { CoreError } from '../util/error-handler';
import { mockActivity } from '../util/mock/data';

export const create = async (userId: string) => {
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

export const get = async ({ userId }: GetActivitiesParams) => {
  try {
    const activities = await Activity.find({ creatorId: userId });

    return activities;
  } catch (error) {
    throw new CoreError('Get activities failed.');
  }
};
