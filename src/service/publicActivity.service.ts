import Activity from '../model/activity.model';
import Comment from '../model/comment.model';
import Keyword from '../model/keyword.model';
import Order from '../model/order.model';
import User from '../model/user.model';
import {
  GetActivityDetailCredential,
  GetRecommendActivitiesCredential,
  replyObject,
} from '../type/activity.type';
import { QuestionSchemaModel, TypeEnum } from '../type/question.type';
import { CoreError } from '../util/error-handler';

export const getRecommendActivities = async ({
  userId,
  limit,
}: GetRecommendActivitiesCredential) => {
  try {
    const randomActivities = await Activity.aggregate().sample(limit);
    await Activity.populate(randomActivities, 'tickets');
    const validActivities = await Activity.aggregate()
      .match({
        $or: [{ endDateTime: { $gte: new Date() } }, { noEndDate: true }],
      })
      .sample(limit);
    await Activity.populate(validActivities, 'tickets');
    validActivities.push(...randomActivities);

    if (userId) {
      const user = await User.findById(userId).select({
        favoriteCategories: 1,
      });
      if (user?.favoriteCategories.length) {
        const favoriteActivities = await Activity.aggregate()
          .match({
            $and: [
              { category: { $in: user.favoriteCategories } },
              {
                $or: [
                  { endDateTime: { $gte: new Date() } },
                  { noEndDate: true },
                ],
              },
            ],
          })
          .sample(limit);
        await Activity.populate(favoriteActivities, 'tickets');

        validActivities.unshift(...favoriteActivities);
      }
    }

    const activities = [];
    for (const validActivity of validActivities.slice(0, limit)) {
      const participantNumber = await Order.find({
        activityId: validActivity._id,
      }).countDocuments();

      const {
        _id,
        thumbnail,
        name,
        summary,
        startDateTime,
        fromToday,
        endDateTime,
        noEndDate,
        location,
        organizer,
        tickets,
      } = validActivity;

      const ticketPrice = [];
      for (const ticket of tickets) {
        ticketPrice.push({
          name: ticket.name,
          price: ticket.price,
        });
      }

      activities.push({
        _id,
        thumbnail,
        name,
        summary,
        startDateTime,
        fromToday,
        endDateTime,
        noEndDate,
        location,
        participantNumber,
        organizerName: organizer.name,
        ticketPrice,
      });
    }

    // valid means within the activity period
    // activities = [validFavoriteActivities, validRandomActivities, randomActivities]
    return activities;
  } catch (error) {
    throw new CoreError('Get recommend activities failed.');
  }
};

export const getPopularKeywords = async () => {
  try {
    const defaultKeywords = ['露營', '酒精路跑', '奇美', '野餐', '登山'];
    const popularKeywords = (
      await Keyword.find({}).limit(5).sort({ count: -1 })
    ).map((keyword) => keyword.content);

    return { keywords: popularKeywords.concat(defaultKeywords).slice(0, 5) };
  } catch (error) {
    throw new CoreError('Get popular keywords failed.');
  }
};

export const getComments = async () => {
  try {
    const comments = await Comment.aggregate().sample(3);

    return { comments };
  } catch (error) {
    throw new CoreError('Get comments failed.');
  }
};

export const getActivityDetail = async ({
  activityId,
  userId,
}: GetActivityDetailCredential) => {
  const activity = await Activity.findById(activityId).populate([
    'tickets',
    'questions',
  ]);
  if (!activity) throw new CoreError('Get activity details failed.');

  try {
    let participantNumber = 0;
    let participantCapacity = 0;
    for (const ticket of activity.tickets) {
      const soldNumber = await Order.find({
        ticketId: ticket._id,
      }).countDocuments();
      ticket.soldNumber = soldNumber;
      participantNumber += soldNumber;
      participantCapacity += ticket.participantCapacity;
    }
    activity.participantCapacity = participantCapacity;
    activity.remainingTickets = participantCapacity - participantNumber;

    const questions: QuestionSchemaModel[] = [];
    const questionIndexes: string[] = [];
    const replies: replyObject = {};
    if (activity.questions.length) {
      for (const question of activity.questions) {
        if (question.type === TypeEnum.QUESTION) {
          questions.push(question);
          questionIndexes.push(question?._id.toString());
        } else {
          const replyQuestionId = question.questionId.toString();
          if (!replies[replyQuestionId]) replies[replyQuestionId] = [];
          replies[replyQuestionId].push(question);
        }
      }

      for (const questionId of Object.keys(replies)) {
        const questionIndex = questionIndexes.findIndex(
          (item) => item === questionId
        );
        questions[questionIndex].replies = replies[questionId];
      }
    }

    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        if (!user.favoriteCategories.includes(activity.category))
          user.favoriteCategories.push(activity.category);
        await user.save();

        if (user.savedActivities?.includes(activity._id)) activity.saved = true;
        const order = await Order.findOne({
          $and: [{ activityId: activity._id }, { userId: user._id }],
        });
        if (order) activity.participated = true;
      }
    }

    const data = {
      activity,
      tickets: activity.tickets,
      questions,
    };

    return data;
  } catch (error) {
    throw new CoreError('Get activity details failed.');
  }
};
