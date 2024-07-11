import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import Activity from '../model/activity.model';
import Order from '../model/order.model';
import User from '../model/user.model';
import {
  CancelOrderParams,
  CreateOrderParams,
  GetOrdersParams,
  OrderStatusEnum,
  UseSerialNumberOrderParams,
} from '../type/order.type';
import { CoreError } from '../util/error-handler';
import { paginator } from '../util/paginator';
import { ActivitySchemaModel } from '../type/activity.type';

export const createOrder = async ({
  userId,
  requestBody,
}: CreateOrderParams) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new CoreError('User not found.');
  }

  if (!user.isEmailValidate) {
    throw new CoreError('User email not validated.');
  }

  try {
    const body = {
      ...requestBody,
      activityId: new mongoose.Types.ObjectId(requestBody.activityId),
      ticketId: new mongoose.Types.ObjectId(requestBody.ticketId),
    };

    const order = {
      userId,
      serialNumber: faker.string.uuid(),
      ...body,
    };

    await Order.create(order);

    const activity = await Activity.findById(requestBody.activityId).select({
      category: 1,
    });
    if (activity) {
      if (!user.favoriteCategories.includes(activity.category))
        user.favoriteCategories.push(activity.category);
      await user.save();
    }
    return { message: 'Create order success.' };
  } catch (error) {
    throw new CoreError(
      error instanceof Error ? error.message : 'Create order failed.'
    );
  }
};

export const getOrderList = async ({
  userId,
  page,
  limit,
  sort,
}: GetOrdersParams) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new CoreError('User not found.');
  }

  try {
    const orders = await Order.find({ userId })
      .select(['-userId'])
      .populate(['activityId', 'ticketId'])
      .where('orderStatus')
      .ne(OrderStatusEnum.CANCELLED)
      .sort({
        createdAt: sort === 'des' ? -1 : 1,
      })
      .lean();
    const updatedOrders = orders.map((order) => {
      const { activityId, ticketId, ...rest } = order;
      return { ...rest, activity: activityId, ticket: ticketId };
    });

    const paginatedData = paginator(updatedOrders, page, limit);

    return paginatedData;
  } catch (error) {
    throw new CoreError(
      error instanceof Error ? error.message : 'Get order list failed.'
    );
  }
};

export const getOrderDetail = async (orderId: string) => {
  try {
    const orderObjectId = new mongoose.Types.ObjectId(orderId);
    const order = await Order.findById(orderObjectId)
      .select(['-userId'])
      .populate(['activityId', 'ticketId'])
      .lean();

    if (!order) {
      throw new CoreError('Order not found.');
    }

    const { activityId, ticketId, ...rest } = order;
    const updatedOrder = { ...rest, activity: activityId, ticket: ticketId };

    return updatedOrder;
  } catch (error) {
    throw new CoreError(
      error instanceof Error ? error.message : 'Get order detail failed.'
    );
  }
};

export const cancelOrder = async ({ userId, orderId }: CancelOrderParams) => {
  const order = await Order.findById(orderId);

  if (!order?.userId.equals(userId)) {
    throw new CoreError('The user is not the order creator.');
  }

  try {
    order.$set({ orderStatus: OrderStatusEnum.CANCELLED });
    await order.save();

    return { message: 'Cancel order success.' };
  } catch (error) {
    throw new CoreError(
      error instanceof Error ? error.message : 'Cancel order failed.'
    );
  }
};

export const useSerialNumberOrder = async ({
  userId,
  serialNumber,
}: UseSerialNumberOrderParams) => {
  const order = await Order.findOne({ serialNumber }).populate('activityId');

  if (!order) {
    throw new CoreError('Order not found.');
  }

  const activityCreator = (order.activityId as unknown as ActivitySchemaModel)
    .creatorId;

  if (!activityCreator.equals(userId)) {
    throw new CoreError('The user is not the activity host.');
  }

  if (order.orderStatus === OrderStatusEnum.USED) {
    throw new CoreError('The order has been used.');
  }

  try {
    order.$set({ orderStatus: OrderStatusEnum.USED });
    await order.save();

    return { message: 'Use order success.' };
  } catch (error) {
    throw new CoreError(
      error instanceof Error ? error.message : 'Use order failed.'
    );
  }
};
