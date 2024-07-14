import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { ZodError } from 'zod';
import MessageList from '../model/message-list.model';
import { MessageUserType, SocketQueryParams } from '../type/message-list.type';
import { messageSchema } from '../util/zod/message-list.schema';
import { zodErrorHandler } from '../util/zod/zodError-hanlder';
import { messageDetailHandler } from '../util/messages-hanlder';

const socketRoute = (io: Server) => {
  io.on('connection', async (socket) => {
    const socketQueryParams = socket.handshake.query as SocketQueryParams;
    const messageListId = socketQueryParams.messageListId;
    const userObjectId = new mongoose.Types.ObjectId(socketQueryParams.userId);

    if (!messageListId || !userObjectId) {
      socket.disconnect(true);
      return;
    }
    const messageListModel = await MessageList.findById(
      new mongoose.Types.ObjectId(messageListId)
    );
    const messageList = await MessageList.findById(
      new mongoose.Types.ObjectId(messageListId)
    ).lean();
    const _messageList = await messageDetailHandler(messageList);

    const userRole = (() => {
      if (messageList?.hostUserId.equals(userObjectId)) {
        return 'host';
      } else if (messageList?.participantUserId.equals(userObjectId)) {
        return 'participant';
      }
    })();

    await MessageList.updateMany(
      {
        _id: messageListId,
        'messages.userType':
          userRole === 'host'
            ? MessageUserType.PARTICIPANT
            : MessageUserType.HOST,
      },
      {
        'messages.$[].receiverIsRead': true,
      }
    );

    socket.emit('history', _messageList);

    socket.on('message', async (msg) => {
      try {
        const validatedMsg = messageSchema.parse(msg);
        await messageListModel?.updateOne({
          $push: {
            messages: validatedMsg,
          },
        });
        await messageListModel?.save();
        const updatedMessageList = await MessageList.findById(
          messageList?._id
        ).lean();
        const _updatedMessageList =
          await messageDetailHandler(updatedMessageList);

        socket.emit('history', _updatedMessageList);
        socket.broadcast.emit('history', _updatedMessageList);
      } catch (error) {
        if (error instanceof ZodError) {
          socket.emit('error', zodErrorHandler(error));
        } else {
          socket.emit('error', 'Error while sending the message');
        }
      }
    });
  });
};

export default socketRoute;
