import Activity from '../model/activity.model';
import Comment from '../model/comment.model';
import Keyword from '../model/keyword.model';
import {
  GetActivityDetailCredential,
  replyObject,
} from '../type/activity.type';
import { QuestionSchemaModel, TypeEnum } from '../type/question.type';
import { CoreError } from '../util/error-handler';

export const getPopularKeywords = async () => {
  try {
    const defaultKeywords = ['露營', '酒精路跑', '奇美', '野餐', '登山'];
    const popularKeywords = (
      await Keyword.find({}).limit(5).sort({ count: -1 })
    ).map((keyword) => keyword.content);

    return { keywords: popularKeywords.concat(defaultKeywords).slice(0, 5) };
  } catch (error) {
    throw new CoreError('Create activity failed.');
  }
};

export const getComments = async () => {
  try {
    const comments = await Comment.aggregate().sample(3);

    return { comments };
  } catch (error) {
    throw new CoreError('Create activity failed.');
  }
};

export const getActivityDetail = async ({
  activityId,
  userId,
}: GetActivityDetailCredential) => {
  try {
    const activity = await Activity.findById(activityId).populate([
      'tickets',
      'questions',
    ]);

    const questions: QuestionSchemaModel[] = [];
    const questionIndexes: string[] = [];
    const replies: replyObject = {};
    if (activity?.questions.length) {
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
      // save the activity category to the user's favorites list
    }

    const data = {
      activity,
      tickets: activity?.tickets,
      questions,
    };

    return data;
  } catch (error) {
    throw new CoreError('Get activity details failed.');
  }
};
