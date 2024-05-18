import Activity from '../model/activity.model';
import { GetActivitiesParams } from '../type/activity.type';
import { CoreError } from '../util/error-handler';
import { activities } from '../util/mock/data';

export const create = async (userId: string) => {
  const activity = new Activity({
    ...activities[Math.floor(Math.random() * 100)],
    creatorId: userId,
  });

  try {
    const updatedActivity = await Activity.findOneAndUpdate(
      { creatorId: userId },
      { $push: { activities: activity } },
      { new: true, upsert: true }
    );

    await updatedActivity.save();

    return updatedActivity;
  } catch (error) {
    throw new CoreError('Create activity failed.');
  }
};

export const get = async (params: GetActivitiesParams) => {
  try {
    const activities = await Activity.find({ creatorId: params.userId });
    return activities;
  } catch (error) {
    console.log('error', error);
    throw new CoreError('Get activities failed.');
  }
};
