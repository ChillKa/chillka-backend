import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { ZodError } from 'zod';
import MessageList from '../model/message-list.model';
import { MessageUserType, SocketQueryParams } from '../type/message-list.type';
import { messageSchema } from '../util/zod/message-list.schema';
import { zodErrorHandler } from '../util/zod/zodError-hanlder';

const socketRoute = (io: Server) => {
  io.on('connection', async (socket) => {
    const socketQueryParams = socket.handshake.query as SocketQueryParams;
    const messageListId = socketQueryParams.messageListId;
    const userId = socketQueryParams.userId;

    if (!messageListId || !userId) {
      socket.disconnect(true);
      return;
    }
    const messageList = await MessageList.findById(
      new mongoose.Types.ObjectId(messageListId)
    );
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const userRole = (() => {
      if (messageList?.hostUserId.equals(userObjectId)) {
        return 'host';
      } else if (messageList?.participantUserId.equals(userObjectId)) {
        return 'participant';
      }
    })();

    // update previous history messages to read
    await MessageList.updateMany(
      {
        _id: messageListId,
        'messages.userType':
          userRole === 'host'
            ? MessageUserType.PARTICIPANT
            : MessageUserType.HOST,
      },
      {
        $set: {
          'messages.$.receiverIsRead': true,
        },
      }
    );

    socket.emit('history', messageList);

    socket.on('chat message', async (msg) => {
      try {
        const validatedMsg = messageSchema.parse(msg);
        await messageList?.updateOne({
          $push: {
            messages: validatedMsg,
          },
        });
        await messageList?.save();
        const updatedMessageList = await MessageList.findById(messageList?._id);
        socket.emit('history', updatedMessageList);
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
