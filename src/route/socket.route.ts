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

const socketRoute = (io: Server) => {
  io.engine.use((req: Request, _res: Response, next: NextFunction) => {
    const isHandshake = req.query === undefined;

    if (!isHandshake) {
      return next();
    }

    const cookies = req.headers.cookie?.split('; ');
    const token = cookies
      ?.find((cookie) => cookie.startsWith('session='))
      ?.split('=')[1];

    if (!token) {
      console.log('no token');
      return next(new Error('No token'));
    }

    jwt.verify(token, process.env.JWT_SECRET!, (error, decoded) => {
      if (error) {
        console.log('invalid jwt token');
        return next(new Error('Invalid token'));
      }
      req.user = decoded as AuthDecoded;
      next();
    });
  });

  io.on('connection', async (socket) => {
    console.log('a user connected');
    const socketQueryParams = socket.handshake.query as SocketQueryParams;
    const messageListId = socketQueryParams.messageListId;
    // FIXME: request is read-only property, can't override the type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userObjectId = (socket.request as any).user?._id;

    if (!messageListId || !userObjectId) {
      console.log('is disconnect');
      socket.disconnect(true);
      return;
    }
    const messageList = await MessageList.findById(
      new mongoose.Types.ObjectId(messageListId)
    );
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
