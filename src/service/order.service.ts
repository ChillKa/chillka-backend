import { faker } from '@faker-js/faker';
import Activity from '../model/activity.model';
import Order from '../model/order.model';
import User from '../model/user.model';
import { CreateOrderParams, OrderStatusEnum } from '../type/order.type';
import { CoreError } from '../util/error-handler';

export const createOrder = async ({
  userId,
  activityId,
  requestBody,
}: CreateOrderParams) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new CoreError('User not found.');
  }

  if (!user.isEmailValidate) {
    throw new CoreError('User email not validated.');
  }

  const activity = await Activity.findById(activityId).populate('tickets');

  if (!activity) {
    throw new CoreError('Activity not found.');
  }

  try {
    await Order.create({
      userId,
      activityId,
      serialNumber: faker.string.uuid(),
      ticketStatus: OrderStatusEnum.VALID,
      ...requestBody,
    });
    return { message: 'Create order success.' };
  } catch (error) {
    throw new CoreError('Create order failed.');
  }
};
