import Keyword from '../model/keyword.model';
import { CoreError } from '../util/error-handler';

export const getPopularKeywords = async () => {
  try {
    const defaultKeywords = ['露營', '酒精路跑', '奇美', '野餐', '登山'];
    const popularKeywords = (
      await Keyword.find({}).limit(5).sort({ count: -1 })
    ).map((keyword) => keyword.content);

    return popularKeywords.concat(defaultKeywords).slice(0, 5);
  } catch (error) {
    throw new CoreError('Create activity failed.');
  }
};
