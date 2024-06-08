import ecpay_payment from 'ecpay_aio_nodejs';
import { Request, Response, Router } from 'express';
import mongoose from 'mongoose';
import authorizeMiddleware from '../middleware/authorize.middleware';
import { zodValidateMiddleware } from '../middleware/validate.middleware';
import Order from '../model/order.model';
import * as OrderService from '../service/order.service';
import { PaymentStatusEnum, PaymentTypeEnum } from '../type/order.type';
import { throwAPIError } from '../util/error-handler';
import { paymentCheckoutSchema } from '../util/zod/payment.schema';

const options = {
  OperationMode: 'Test',
  MercProfile: {
    MerchantID: process.env.MERCHANTID,
    HashKey: process.env.HASHKEY,
    HashIV: process.env.HASHIV,
  },
  IgnorePayment: [],
  IsProjectContractor: false,
};

const paymentRouter = () => {
  const router = Router();

  router.get(
    '/payment',
    authorizeMiddleware,
    zodValidateMiddleware(paymentCheckoutSchema),
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['Payment'] 
          #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: "#/schemas/TriggerPaymentCredentials" },
          }
      */

      const {
        activityId,
        ticketId,
        orderContact,
        payment,
        tradeDesc,
        itemName,
      } = req.body;
      const userId = req.user?._id;
      const TradeNo = 'test' + new Date().getTime();
      const MerchantTradeDate = new Date().toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'UTC',
      });
      const baseParam = {
        MerchantTradeNo: TradeNo,
        MerchantTradeDate,
        TotalAmount: payment.amount,
        TradeDesc: tradeDesc,
        ItemName: itemName,
        ReturnURL: process.env.PAYMENT_RETURN_URL,
        ClientBackURL: process.env.FRONTEND,
      };

      try {
        await OrderService.createOrder({
          userId: new mongoose.Types.ObjectId(userId),
          requestBody: {
            activityId,
            ticketId,
            orderContact,
            payment,
            transactionId: TradeNo,
          },
        });

        const create = new ecpay_payment(options);
        const html = create.payment_client.aio_check_out_all(baseParam);

        res.status(200).send(html);
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  // 後端接收綠界回傳的資料
  router.post('/payment_result', async (req: Request, res: Response) => {
    /* #swagger.ignore = true */

    try {
      const { RtnCode, MerchantTradeNo, PaymentType, CheckMacValue } = req.body;
      const data = { ...req.body };
      delete data.CheckMacValue; // 此段不驗證

      const create = new ecpay_payment(options);
      const checkValue = create.payment_client.helper.gen_chk_mac_value(data);

      if (RtnCode == 1) {
        await Order.findByIdAndUpdate(
          { transactionId: MerchantTradeNo },
          {
            payment: {
              status: PaymentStatusEnum.PAID,
              type: PaymentTypeEnum[
                PaymentType as keyof typeof PaymentTypeEnum
              ],
            },
          }
        );
      } else {
        await Order.findByIdAndUpdate(
          { transactionId: MerchantTradeNo },
          { payment: { status: PaymentStatusEnum.ERROR } }
        );
      }

      console.log(
        '確認交易正確性：',
        CheckMacValue === checkValue,
        CheckMacValue,
        checkValue
      );

      res.send('1|OK');
    } catch (error) {
      console.log('error', error);
      throwAPIError({ res, error, statusCode: 400 });
    }
  });

  return router;
};
const paymentRoute = paymentRouter();

export default paymentRoute;
