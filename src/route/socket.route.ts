import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { ZodError } from 'zod';
import MessageList from '../model/message-list.model';
import { MessageUserType, SocketQueryParams } from '../type/message-list.type';
import { messageSchema } from '../util/zod/message-list.schema';
import { zodErrorHandler } from '../util/zod/zodError-hanlder';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthDecoded } from '../type/model.type';
import { messageDetailHandler } from '../util/messages-hanlder';

const socketRoute = (io: Server) => {
  io.engine.use((req: Request, _res: Response, next: NextFunction) => {
    const isHandshake = req.query === undefined;
    console.log('req=', req);

    if (!isHandshake) {
      return next();
    }

    const cookies = req.headers.cookie?.split('; ');
    console.log('cookies=', cookies);
    const token = cookies
      ?.find((cookie) => cookie.startsWith('session='))
      ?.split('=')[1];

    console.log('token=', token);

    if (!token) {
      console.log('no token');
      return next(new Error('No token'));
    }

    jwt.verify(token, process.env.JWT_SECRET!, (error, decoded) => {
      if (error) {
        console.log('invalid token');
        return next(new Error('Invalid token'));
      }
      req.user = decoded as AuthDecoded;
      next();
    });
  });

  io.on('connection', async (socket) => {
    const socketQueryParams = socket.handshake.query as SocketQueryParams;
    const messageListId = socketQueryParams.messageListId;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userObjectId = (socket.request as any).user?._id;

    console.log('userObjectId=', userObjectId, 'messageListId=', messageListId);

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
        $set: {
          'messages.$.receiverIsRead': true,
        },
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
