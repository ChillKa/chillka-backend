import Activity from '../model/activity.model';
import {
  ActivitySchemaModel,
  GetActivitiesParams,
} from '../type/activity.type';
import { CoreError } from '../util/error-handler';
import { paginator } from '../util/paginator';

export const create = async (reqBody: ActivitySchemaModel) => {
  const newActivity = new Activity(reqBody);

  try {
    await newActivity.save();

    return newActivity;
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
