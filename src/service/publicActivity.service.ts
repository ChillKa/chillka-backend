import Activity from '../model/activity.model';
import {
  GetActivityDetailCredential,
  replyObject,
} from '../type/activity.type';
import { CommentSchemaModel } from '../type/comment.type';
import { CoreError } from '../util/error-handler';

export const getActivityDetail = async ({
  activityId,
}: GetActivityDetailCredential) => {
  try {
    const activity = await Activity.findById(activityId).populate([
      'tickets',
      'comments',
    ]);

    const questions: CommentSchemaModel[] = [];
    const questionIndexes: string[] = [];
    const replies: replyObject = {};
    if (activity?.comments.length) {
      for (const comment of activity.comments) {
        if (comment.type === '提問') {
          questions.push(comment);
          questionIndexes.push(comment?._id.toString());
        } else {
          const replyCommentId = comment.commentId.toString();
          if (!replies[replyCommentId]) replies[replyCommentId] = [];
          replies[replyCommentId].push(comment);
        }
      }

      for (const commentId of Object.keys(replies)) {
        const questionIndex = questionIndexes.findIndex(
          (item) => item === commentId
        );
        questions[questionIndex].replies = replies[commentId];
      }
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
