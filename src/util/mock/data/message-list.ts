import { faker } from '@faker-js/faker';
import { MessageUserType } from '../../../type/message-list.type';

const messageList = Array.from({ length: 10 }, () => ({
  orderId: '',
  hostUserId: '',
  participantUserId: '',
  messages: [
    {
      userType: MessageUserType.HOST,
      content: '您好，這裡通知我們會在活動開始前30分鐘開始入場',
      receiverIsRead: true,
      createdAt: faker.date.recent(),
      updateAt: faker.date.recent(),
    },
    {
      userType: MessageUserType.PARTICIPANT,
      content: '我收到了您的入場通知,謝謝。我會準時到達的',
      receiverIsRead: true,
      createdAt: faker.date.recent(),
      updateAt: faker.date.recent(),
    },
    {
      userType: MessageUserType.HOST,
      content: '活動當日的天氣預報不太理想,我們會提供雨具供大家使用',
      receiverIsRead: true,
      createdAt: faker.date.recent(),
      updateAt: faker.date.recent(),
    },
    {
      userType: MessageUserType.HOST,
      content: '活動當日停車位有限,我們建議大家可以考慮公共交通工具前來',
      receiverIsRead: true,
      createdAt: faker.date.recent(),
      updateAt: faker.date.recent(),
    },
    {
      userType: MessageUserType.PARTICIPANT,
      content: '感謝您的天氣預報提醒,我會做好雨具準備的',
      receiverIsRead: true,
      createdAt: faker.date.recent(),
      updateAt: faker.date.recent(),
    },
  ],
}));

export default messageList;
