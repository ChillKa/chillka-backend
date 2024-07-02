import mongoose from 'mongoose';
import { MessageListSchemaModel } from '../type/message-list.type';
import User from '../model/user.model';
import Order from '../model/order.model';

export const messageListHandler = async (
  list: mongoose.FlattenMaps<MessageListSchemaModel> & {
    _id: mongoose.Types.ObjectId;
  }
) => ({
  ...list,
  host: await User.findById(list.hostUserId).select([
    'displayName',
    'profilePicture',
  ]),
  participant: await User.findById(list.participantUserId).select([
    'displayName',
    'profilePicture',
  ]),
  messages: list.messages[list.messages.length - 1],
});

export const messageDetailHandler = async (
  list:
    | (mongoose.FlattenMaps<MessageListSchemaModel> & {
        _id: mongoose.Types.ObjectId;
      })
    | null
) => {
  if (!list) return;
  const order = await Order.findById(list.orderId)
    .populate('activityId', '_id name')
    .select(['activityId'])
    .exec();

  return {
    ...list,
    host: await User.findById(list.hostUserId).select([
      'displayName',
      'profilePicture',
    ]),
    participant: await User.findById(list.participantUserId).select([
      'displayName',
      'profilePicture',
    ]),
    activity: {
      _id: order?.activityId._id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      name: (order?.activityId as any).name,
    },
  };
};
