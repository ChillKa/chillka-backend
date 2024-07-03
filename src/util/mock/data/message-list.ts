import { faker } from '@faker-js/faker';
import { MessageUserType } from '../../../type/message-list.type';

const messageList = Array.from({ length: 10 }, () => ({
  orderId: '',
  hostUserId: '',
  participantUserId: '',
  messages: [
    [
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
    [
      {
        userType: MessageUserType.HOST,
        content: '親愛的參與者,活動報到時間為上午9時,請大家準時出席',
        receiverIsRead: true,
        createdAt: faker.date.recent(),
        updateAt: faker.date.recent(),
      },
      {
        userType: MessageUserType.PARTICIPANT,
        content: '收到,我會確保準時到達的',
        receiverIsRead: true,
        createdAt: faker.date.recent(),
        updateAt: faker.date.recent(),
      },
      {
        userType: MessageUserType.HOST,
        content:
          '請大家務必佩戴工作人員發放的識別證,以便我們進行活動期間的管理',
        receiverIsRead: true,
        createdAt: faker.date.recent(),
        updateAt: faker.date.recent(),
      },
      {
        userType: MessageUserType.PARTICIPANT,
        content: '明白了,我會佩戴好識別證的',
        receiverIsRead: true,
        createdAt: faker.date.recent(),
        updateAt: faker.date.recent(),
      },
    ],
    [
      {
        userType: MessageUserType.HOST,
        content: '各位參與者您好,活動正式開始了,請大家按時就坐',
        receiverIsRead: true,
        createdAt: faker.date.recent(),
        updateAt: faker.date.recent(),
      },
      {
        userType: MessageUserType.PARTICIPANT,
        content: '已經就座了,非常感謝您的提醒',
        receiverIsRead: true,
        createdAt: faker.date.recent(),
        updateAt: faker.date.recent(),
      },
      {
        userType: MessageUserType.HOST,
        content: '感謝大家的配合,活動正式開始,祝各位活動愉快!',
        receiverIsRead: true,
        createdAt: faker.date.recent(),
        updateAt: faker.date.recent(),
      },
      {
        userType: MessageUserType.PARTICIPANT,
        content: '祝活動圓滿成功,謝謝組織者的辛勞!',
        receiverIsRead: true,
        createdAt: faker.date.recent(),
        updateAt: faker.date.recent(),
      },
    ],
    [
      {
        userType: MessageUserType.HOST,
        content: '尊敬的參與者,活動即將結束,請各位準備離場',
        receiverIsRead: true,
        createdAt: faker.date.recent(),
        updateAt: faker.date.recent(),
      },
      {
        userType: MessageUserType.PARTICIPANT,
        content: '活動結束了,很感謝工作人員的辛勤付出',
        receiverIsRead: true,
        createdAt: faker.date.recent(),
        updateAt: faker.date.recent(),
      },
      {
        userType: MessageUserType.HOST,
        content: '感謝各位參與者的到來,祝您們旅途愉快',
        receiverIsRead: true,
        createdAt: faker.date.recent(),
        updateAt: faker.date.recent(),
      },
      {
        userType: MessageUserType.PARTICIPANT,
        content: '活動非常成功,下次有類似活動我一定會再來參加',
        receiverIsRead: true,
        createdAt: faker.date.recent(),
        updateAt: faker.date.recent(),
      },
    ],
    [
      {
        userType: MessageUserType.HOST,
        content: '各位參與者,請您們保持現場秩序,遵守工作人員的指引',
        receiverIsRead: true,
        createdAt: faker.date.recent(),
        updateAt: faker.date.recent(),
      },
      {
        userType: MessageUserType.PARTICIPANT,
        content: '好的,我會遵守現場規則,並聽從工作人員的指引',
        receiverIsRead: true,
        createdAt: faker.date.recent(),
        updateAt: faker.date.recent(),
      },
      {
        userType: MessageUserType.HOST,
        content: '如果有任何問題,請隨時找工作人員,我們會盡力為您解答',
        receiverIsRead: true,
        createdAt: faker.date.recent(),
        updateAt: faker.date.recent(),
      },
      {
        userType: MessageUserType.PARTICIPANT,
        content: '明白了,我會在有需要時主動找工作人員',
        receiverIsRead: true,
        createdAt: faker.date.recent(),
        updateAt: faker.date.recent(),
      },
    ],
    [
      {
        userType: MessageUserType.HOST,
        content: '各位參與者,感謝您們的參與,活動圓滿結束',
        receiverIsRead: true,
        createdAt: faker.date.recent(),
        updateAt: faker.date.recent(),
      },
      {
        userType: MessageUserType.PARTICIPANT,
        content: '感謝您們的精心組織,這次活動非常成功',
        receiverIsRead: true,
        createdAt: faker.date.recent(),
        updateAt: faker.date.recent(),
      },
      {
        userType: MessageUserType.HOST,
        content: '期待下次與您們再次相聚,祝各位身體健康,工作順利',
        receiverIsRead: true,
        createdAt: faker.date.recent(),
        updateAt: faker.date.recent(),
      },
      {
        userType: MessageUserType.PARTICIPANT,
        content: '同樣祝您們工作順利,再次感謝組織者的辛勞',
        receiverIsRead: true,
        createdAt: faker.date.recent(),
        updateAt: faker.date.recent(),
      },
    ],
  ],
}));

export default messageList;
