import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import Activity from '../model/activity.model';
import Order from '../model/order.model';
import User from '../model/user.model';
import { CreateOrderParams } from '../type/order.type';
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

  const activity = await Activity.findById(activityId);
  if (!activity) {
    throw new CoreError('Activity not found.');
  }

  const body = {
    ...requestBody,
    ticketId: new mongoose.Types.ObjectId(requestBody.ticketId),
  };

  const order = {
    userId,
    activityId,
    serialNumber: faker.string.uuid(),
    ...body,
  };

  try {
    await Order.create(order);
    return { message: 'Create order success.' };
  } catch (error) {
    throw new CoreError('Create order failed.');
  }
};
