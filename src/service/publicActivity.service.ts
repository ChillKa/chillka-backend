import Activity from '../model/activity.model';
import {
  GetActivityDetailCredential,
  replyObject,
} from '../type/activity.type';
import { QuestionSchemaModel } from '../type/question.type';
import { CoreError } from '../util/error-handler';

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
        if (question.type === '提問') {
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
