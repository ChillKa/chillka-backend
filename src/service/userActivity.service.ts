import Activity from '../model/activity.model';
import { GetActivitiesParams } from '../type/activity.type';
import { CoreError } from '../util/error-handler';
import { mockActivity } from '../util/mock/data';
import { paginator } from '../util/paginator';

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

export const get = async ({
  userId,
  page = 1,
  limit = 20,
  sort = 'des',
}: GetActivitiesParams) => {
  try {
    const activities = await Activity.find({ creatorId: userId }).sort({
      createdAt: sort === 'des' ? -1 : 1,
    });
    const paginatedData = paginator(activities, page, limit);

    return paginatedData;
  } catch (error) {
    throw new CoreError('Get activities failed.');
  }
};
