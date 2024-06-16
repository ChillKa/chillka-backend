import mongoose from 'mongoose';
import Activity from '../model/activity.model';
import MessageList from '../model/message-list.model';
import Order from '../model/order.model';
import { GetMessageListParams } from '../type/message-list.type';
import { CoreError } from '../util/error-handler';

export const getMessageListId = async ({
  orderId,
  hostUserId,
  participantUserId,
}: GetMessageListParams) => {
  const messageList = await MessageList.findOne({
    orderId,
    hostUserId,
    participantUserId,
  });

  if (hostUserId === participantUserId) {
    throw new CoreError('Host and participant cannot be the same user.');
  }
  const orderObjectId = new mongoose.Types.ObjectId(orderId);
  const hostUserIdObjectId = new mongoose.Types.ObjectId(hostUserId);
  const participantUserIdObjectId = new mongoose.Types.ObjectId(
    participantUserId
  );

  const order = await Order.findById(orderObjectId);
  const activity = await Activity.findById(order?.activityId);
  if (!order?.userId.equals(participantUserIdObjectId)) {
    throw new CoreError("Participant doesn't same as the order user.");
  }
  if (!activity?.creatorId.equals(hostUserIdObjectId)) {
    throw new CoreError("Host doesn't same as the activity creator.");
  }

  try {
    if (!messageList) {
      const newMessageList = new MessageList({
        orderId,
        hostUserId,
        participantUserId,
      });
      await newMessageList.save();

      return { messageListId: newMessageList._id };
    } else {
      return { messageListId: messageList._id };
    }
  } catch (error) {
    throw new CoreError('Get message list id failed.');
  }
};
