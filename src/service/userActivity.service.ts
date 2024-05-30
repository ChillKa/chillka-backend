import { faker } from '@faker-js/faker';
import Activity from '../model/activity.model';
import MessageList from '../model/message-list.model';
import Message from '../model/message.model';
import Ticket from '../model/ticket.model';
import User from '../model/user.model';
import {
  ActivityCreateCredentials,
  AttendActivityParams,
  CancelActivityParams,
  CollectActivityParams,
  GetActivitiesParams,
  GetActivityParticipantParams,
  GetSavedActivityParams,
  QuestionCredentials,
  StatusEnum,
} from '../type/activity.type';
import { TicketStatusEnum } from '../type/ticket.type';
import { CoreError } from '../util/error-handler';
import { paginator } from '../util/paginator';

export const createActivity = async ({
  tickets,
  ...activityData
}: ActivityCreateCredentials) => {
  try {
    const newActivity = new Activity(activityData);
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
      return { message: 'Activity already collected.' };
    }

    user.savedActivities?.push(activityId);
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

export const createQuestion = async ({
  userId,
  activityId,
  question,
}: QuestionCredentials) => {
  const existingActivity = await Activity.findById(activityId);
  if (!existingActivity)
    throw new CoreError(
      'Cannot ask questions because the activity does not exist.'
    );
  if (existingActivity.creatorId.equals(userId))
    throw new CoreError('The creator of the activity cannot ask questions.');
  try {
    const user = await User.findById(userId).select('displayName');
    const messageList = await MessageList.create({
      activityId,
      userId,
      question,
      displayName: user?.displayName,
    });

    return messageList;
  } catch (error) {
    throw new CoreError('Ask question failed.');
  }
};

export const editQuestion = async ({
  userId,
  activityId,
  question,
  questionId,
}: QuestionCredentials) => {
  const existingActivity = await Activity.findById(activityId);
  if (!existingActivity)
    throw new CoreError(
      'Cannot edit questions because the activity does not exist.'
    );
  const existingQuestion = await MessageList.findById(questionId);
  if (!existingQuestion)
    throw new CoreError(
      'Cannot edit questions because the question does not exist.'
    );
  if (!existingQuestion.userId.equals(userId))
    throw new CoreError('Only the questioner can modify the question.');
  const existingMessages = await Message.find({ messageListId: questionId });
  if (existingMessages.length)
    throw new CoreError(
      'You cannot modify the question if there is already a reply.'
    );
  try {
    const messageList = await MessageList.findOneAndUpdate(
      { _id: questionId },
      { $set: { question } },
      { new: true }
    );

    return messageList;
  } catch (error) {
    throw new CoreError('Ask question failed.');
  }
};

export const deleteQuestion = async ({
  userId,
  activityId,
  questionId,
}: QuestionCredentials) => {
  const existingActivity = await Activity.findById(activityId);
  if (!existingActivity)
    throw new CoreError(
      'Cannot delete questions because the activity does not exist.'
    );
  const existingQuestion = await MessageList.findById(questionId);
  if (!existingQuestion)
    throw new CoreError(
      'Cannot delete questions because the question does not exist.'
    );
  if (!existingQuestion.userId.equals(userId))
    throw new CoreError('Only the questioner can delete the question.');
  const existingMessages = (
    await Message.find({ messageListId: questionId }).select('_id')
  ).map((message) => message._id.toString());
  try {
    if (existingMessages.length) {
      await Message.deleteMany({ _id: { $in: existingMessages } });
    }
    await MessageList.deleteOne({ _id: questionId });

    return { message: 'success delete' };
  } catch (error) {
    throw new CoreError('Ask question failed.');
  }
};
