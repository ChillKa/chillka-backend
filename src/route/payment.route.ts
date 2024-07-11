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

  router
    .post(
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
          ClientBackURL: process.env.FRONTEND + '/payment/complete',
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

          if (payment.amount == 0) {
            const order = await Order.findOneAndUpdate(
              { transactionId: TradeNo },
              {
                $set: {
                  'payment.status': PaymentStatusEnum.FREE,
                  'payment.type': PaymentTypeEnum.FREE,
                },
              },
              { new: true }
            )
              .populate('ticketId')
              .lean();

            const response = {
              _id: order?._id,
              ticket: order?.ticketId,
              orderContact: order?.orderContact,
              payment: order?.payment,
              orderStatus: order?.orderStatus,
            };

            return res
              .status(200)
              .send({ message: 'Created order successfully.', data: response });
          }

          const create = new ecpay_payment(options);
          const html = create.payment_client.aio_check_out_all(baseParam);

          res.status(200).send(html);
        } catch (error) {
          throwAPIError({ res, error, statusCode: 400 });
        }
      }
    )
    // 付款完成後，綠界會將結果回傳至此
    .post('/payment_result', async (req: Request, res: Response) => {
      /* #swagger.ignore = true */

      try {
        const { RtnMsg, MerchantTradeNo, PaymentType, CheckMacValue } =
          req.body;
        const data = { ...req.body };
        delete data.CheckMacValue; // 此段不驗證

        const create = new ecpay_payment(options);
        const checkValue = create.payment_client.helper.gen_chk_mac_value(data);

        if (RtnMsg === '交易成功' && CheckMacValue === checkValue) {
          await Order.findOneAndUpdate(
            { transactionId: MerchantTradeNo },
            {
              $set: {
                'payment.status': PaymentStatusEnum.PAID,
                'payment.type':
                  PaymentTypeEnum[PaymentType as keyof typeof PaymentTypeEnum],
              },
            },
            { new: true }
          );
        } else {
          await Order.findOneAndUpdate(
            { transactionId: MerchantTradeNo },
            {
              $set: {
                'payment.status': PaymentStatusEnum.ERROR,
              },
            },
            { new: true }
          );
        }

        res.send('1|OK');
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    });

  router.get(
    '/payment/complete',
    authorizeMiddleware,
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['Payment'] */
      const userId = req.user?._id;

      try {
        const order = await Order.findOne(
          { userId },
          {},
          { sort: { updatedAt: -1 } }
        );

        return res.status(200).send({
          _id: order?._id,
          activityId: order?.activityId,
          status:
            order?.payment.status === PaymentStatusEnum.FREE ||
            order?.payment.status === PaymentStatusEnum.PAID
              ? 'success'
              : 'fail',
        });
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  return router;
};
const paymentRoute = paymentRouter();

export default paymentRoute;
