import { OrderSchemaModel } from './order.type';

export type TriggerPaymentCredentials = Pick<
  OrderSchemaModel,
  'orderContact' | 'payment'
> & {
  tradeDesc: string;
  itemName: string;
};
