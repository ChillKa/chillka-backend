import MessageList from '../model/message-list.model';
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

  // TODO: Check if the user is the host or participant of the order

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
