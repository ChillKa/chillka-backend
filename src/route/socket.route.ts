import mongoose from 'mongoose';
import { Server } from 'socket.io';
import MessageList from '../model/message-list.model';
import { LiveMessageParams } from '../type/message-list.type';

const socketRoute = (io: Server) => {
  console.log('socketRoute');
  io.on('connection', async (socket) => {
    // FIXME
    const messageListId = new mongoose.Types.ObjectId(
      (socket.handshake.query.messageListId as string) ?? ''
    );

    console.log('query', socket.handshake.query);

    if (!messageListId) {
      socket.disconnect(true);
      return;
    }

    const messageList = await MessageList.findById(messageListId);

    // restrict to host and participant user
    socket.emit('history', messageList);

    socket.on('chat message', async (msg) => {
      const data = JSON.parse(msg) as LiveMessageParams;
      await messageList?.updateOne({
        $push: {
          messages: data.messages,
        },
      });

      // restrict to host and participant user
      io.emit('chat message', messageList);
    });
  });
};

export default socketRoute;
