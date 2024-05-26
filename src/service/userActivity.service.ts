import Activity from '../model/activity.model';
import Ticket from '../model/ticket.model';
import {
  ActivityCreateCredentials,
  CancelActivityParams,
  GetActivitiesParams,
  StatusEnum,
} from '../type/activity.type';
import { CoreError } from '../util/error-handler';
import { paginator } from '../util/paginator';

export const create = async ({
  tickets,
  ...activityData
}: ActivityCreateCredentials) => {
  const newActivity = new Activity(activityData);
  const newTickets = tickets.map((ticket) => {
    ticket.activityId = newActivity._id;
    ticket.userId = newActivity.creatorId;
    return ticket;
  });
  try {
    await newActivity.save();
    await Ticket.insertMany(newTickets);

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

  await activity?.updateOne({ $set: { status: StatusEnum.CANCELLED } });

  return activity;
};
