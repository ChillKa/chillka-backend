import mongoose from 'mongoose';
import Activity from '../model/activity.model';
import MessageList from '../model/message-list.model';
import Order from '../model/order.model';
import Question from '../model/question.model';
import Ticket from '../model/ticket.model';
import User from '../model/user.model';
import {
  ActivityCreateParams,
  ActivityEditParams,
  CancelActivityParams,
  CollectActivityParams,
  GetActivitiesParams,
  GetActivityParticipantParams,
  GetSavedActivityParams,
  QuestionCredentials,
  StatusEnum,
} from '../type/activity.type';
import { MessageUserType } from '../type/message-list.type';
import { TypeEnum } from '../type/question.type';
import { CoreError } from '../util/error-handler';
import { paginator } from '../util/paginator';

export const createActivity = async ({
  tickets,
  ...activityData
}: ActivityCreateParams) => {
  try {
    activityData.startDateTime = activityData.fromToday
      ? new Date()
      : activityData.startDateTime;
    activityData.endDateTime = activityData.noEndDate
      ? new Date('2100/01/01')
      : activityData.endDateTime;
    const newActivity = new Activity(activityData);
    const newTickets = tickets?.map((ticket) => {
      ticket.activityId = newActivity._id;
      ticket.startDateTime = ticket.fromToday
        ? new Date()
        : ticket.startDateTime;
      ticket.endDateTime = ticket.noEndDate
        ? new Date('2100/01/01')
        : ticket.endDateTime;
      newActivity.totalParticipantCapacity += ticket.participantCapacity;
      return ticket;
    });
    await Ticket.insertMany(newTickets);
    await newActivity.save();

    return newActivity;
  } catch (error) {
    throw new CoreError(
      error instanceof Error ? error.message : 'Create activity failed.'
    );
  }
};

// the tickets have three conditions:
//   1. with _id
//      - _id is existing tickets (update)
//      - _id not found (throw new Error)
//   2. ticket data without _id
//      - create new tickets
//   3. the existing tickets' _id are not pass to backend
//      - delete the existing tickets if ticket is not sold
//      - throw new Error if tickets is sold
export const editActivity = async ({
  userId,
  activityId,
  tickets,
  ...activityData
}: ActivityEditParams) => {
  const existingActivity = await Activity.findById(activityId);
  if (!existingActivity?.creatorId.equals(userId))
    throw new CoreError('Activity cannot be edited by non-creators.');
  const activityOrders = await Order.find({ activityId });
  if (activityOrders.length) {
    // todo：send notices to participant if tickets are sold
  }

  const existingTicketObjectIds = await Ticket.find({ activityId }).select(
    '_id'
  );
  const updateTickets = [];
  const createTickets = [];
  const deleteTickets = [];

  for (const ticket of tickets) {
    if (ticket?._id) {
      // 1. check if the ticket already exists and update it
      const ticketIndex = existingTicketObjectIds
        .map((item) => item._id.toString())
        .indexOf(ticket?._id.toString());
      if (ticketIndex === -1)
        throw new CoreError(
          'The ticket does not exist so the activity cannot be edited.'
        );
      updateTickets.push(ticket);
      existingTicketObjectIds.splice(ticketIndex, 1);
    } else {
      // 2. create new ticket
      createTickets.push(ticket);
    }
  }

  // 3. delete the existing ticket if not pass to backend
  if (existingTicketObjectIds.length) {
    for (const deleteTicketId of existingTicketObjectIds) {
      const deleteTicketOrders = await Order.find({
        ticketId: deleteTicketId,
      });
      if (deleteTicketOrders.length)
        throw new CoreError(
          'Tickets cannot be deleted when they have been sold.'
        );
      deleteTickets.push(deleteTicketId);
    }
  }

  try {
    await existingActivity.updateOne(activityData);
    for (const updateTicket of updateTickets) {
      await Ticket.findByIdAndUpdate({ _id: updateTicket._id }, updateTicket);
    }
    for (const createTicket of createTickets) {
      createTicket.activityId = new mongoose.Types.ObjectId(activityId);
      await Ticket.create(createTicket);
    }
    for (const deleteTicket of deleteTickets) {
      await Ticket.deleteOne({ _id: deleteTicket });
    }

    return { message: 'success update' };
  } catch (error) {
    throw new CoreError(
      error instanceof Error ? error.message : 'Edit activity failed.'
    );
  }
};

export const getActivityList = async ({
  userId,
  page,
  limit,
  sort,
}: GetActivitiesParams) => {
  if (!userId) throw new CoreError('Unable to get activities without user id.');
  try {
    const activities = await Activity.find({
      creatorId: userId,
    }).sort({
      createdAt: sort === 'des' ? -1 : 1,
    });

    const paginatedData = paginator(activities, page, limit);

    return paginatedData;
  } catch (error) {
    throw new CoreError(
      error instanceof Error ? error.message : 'Get activities failed.'
    );
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

  const activity = await Activity.findById(activityId);
  if (!activity) {
    throw new CoreError('Activity not found.');
  }

  try {
    const data = await Order.find({
      activityId,
      'orderContact.name': new RegExp(participantName ?? '', 'i'),
    })
      .populate(['userId', 'ticketId'])
      .select(['-_id', '-activityId', '-transactionId'])
      .lean();
    const _data = data.map((order) => {
      const { userId, ticketId, ...rest } = order;
      return { ...rest, user: userId, ticket: ticketId };
    });

    const paginatedData = paginator(_data ?? [], page, limit);

    return paginatedData;
  } catch (error) {
    throw new CoreError(
      error instanceof Error ? error.message : 'Get participant list failed.'
    );
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
      user.savedActivities = user.savedActivities.filter(
        (_id) => !_id.equals(activityId)
      );
    } else {
      user.savedActivities?.push(activityId);
    }
    await user?.save();

    return { message: 'Collect activity success.' };
  } catch (error) {
    throw new CoreError(
      error instanceof Error ? error.message : 'Collect activity failed.'
    );
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
    const saveActivities = [];
    if (data) {
      for (const item of data) {
        const savedActivity = await Activity.findById(item._id).populate(
          'tickets'
        );
        if (savedActivity) {
          savedActivity.participantAmount =
            savedActivity.totalParticipantCapacity -
            savedActivity.remainingTickets;

          savedActivity.participantAmount = 0;
          for (const ticket of savedActivity.tickets) {
            const soldNumber = await Order.find({
              ticketId: ticket._id,
            }).countDocuments();
            ticket.soldNumber = soldNumber;
            savedActivity.participantAmount += soldNumber;
            savedActivity.unlimitedQuantity =
              savedActivity.unlimitedQuantity || ticket.unlimitedQuantity;
          }
          savedActivity.remainingTickets =
            savedActivity.totalParticipantCapacity -
            savedActivity.participantAmount;
          const activity = JSON.parse(JSON.stringify(savedActivity));
          activity.tickets = savedActivity.tickets;
          saveActivities.push(activity);
        }
      }
    }

    const paginatedData = paginator(saveActivities ?? [], page, limit);

    return paginatedData;
  } catch (error) {
    throw new CoreError(
      error instanceof Error ? error.message : 'Get saved activity list failed.'
    );
  }
};

export const createQuestion = async ({
  userId,
  activityId,
  type,
  questionId,
  content,
}: QuestionCredentials) => {
  const existingActivity = await Activity.findById(activityId);
  const existingQuestion = await Question.findOne({
    _id: questionId,
    type: TypeEnum.QUESTION,
  });
  if (!existingActivity)
    throw new CoreError(
      'Cannot create questions because the activity does not exist.'
    );
  if (type === TypeEnum.QUESTION && existingActivity.creatorId.equals(userId))
    throw new CoreError('The creator of the activity cannot create questions.');
  if (type === TypeEnum.REPLY && !existingQuestion)
    throw new CoreError(
      'Cannot reply to the question because there is no question.'
    );

  try {
    const user = await User.findById(userId).select('displayName');
    const newQuestion = await Question.create({
      activityId,
      userId,
      type,
      content,
      questionId,
      displayName: user?.displayName,
    });

    return newQuestion;
  } catch (error) {
    throw new CoreError(
      error instanceof Error ? error.message : 'Create question failed.'
    );
  }
};

export const editQuestion = async ({
  userId,
  activityId,
  questionId,
  content,
}: QuestionCredentials) => {
  const existingActivity = await Activity.findById(activityId);
  if (!existingActivity)
    throw new CoreError(
      'Cannot edit questions because the activity does not exist.'
    );
  const existingQuestion = await Question.findById(questionId);
  if (!existingQuestion)
    throw new CoreError(
      'Cannot edit questions because the question does not exist.'
    );
  if (!existingQuestion.userId.equals(userId))
    throw new CoreError('Only questioner can edit the question.');

  try {
    const editQuestion = await Question.findOneAndUpdate(
      { _id: questionId },
      { $set: { content } },
      { new: true }
    );

    return editQuestion;
  } catch (error) {
    throw new CoreError(
      error instanceof Error ? error.message : 'Edit question failed.'
    );
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
  const existingQuestion = await Question.findById(questionId);
  if (!existingQuestion)
    throw new CoreError(
      'Cannot delete questions because the question does not exist.'
    );
  if (
    !existingQuestion.userId.equals(userId) &&
    !existingActivity.creatorId.equals(userId)
  )
    throw new CoreError(
      'Only questioner or activity creator can delete the question.'
    );
  try {
    await Question.deleteMany({ $or: [{ _id: questionId }, { questionId }] });

    return { message: 'success delete' };
  } catch (error) {
    throw new CoreError(
      error instanceof Error ? error.message : 'Ask question failed.'
    );
  }
};

export const createActivityMessage = async ({
  userId,
  participantId,
  activityId,
  content,
}: {
  userId?: mongoose.Types.ObjectId;
  participantId: string;
  activityId: string;
  content: string;
}) => {
  const existingOrder = await Order.findOne({
    userId,
    activityId,
  });
  const participantObjectId = new mongoose.Types.ObjectId(participantId);

  if (!participantObjectId.equals(existingOrder?.userId)) {
    throw new CoreError('Unauthorized participantId.');
  }
  if (userId?.equals(participantObjectId)) {
    throw new CoreError('User cannot send message to themselves.');
  }

  const messageListRequest = {
    orderId: existingOrder?._id,
    participantUserId: existingOrder?.userId,
    hostUserId: userId,
  };

  try {
    const messageList = await MessageList.findOne(messageListRequest);

    if (!messageList) {
      await MessageList.create(messageListRequest);
    }

    messageList?.messages.push({
      userType: MessageUserType.HOST,
      content,
    });

    return { message: 'Send message success.' };
  } catch (error) {
    throw new CoreError(
      error instanceof Error ? error.message : 'Send message failed.'
    );
  }
};
