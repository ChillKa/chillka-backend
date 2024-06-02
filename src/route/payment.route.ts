import ecpay_payment from 'ecpay_aio_nodejs';
import { Request, Response, Router } from 'express';
import { zodValidateMiddleware } from '../middleware/validate.middleware';
import { throwAPIError } from '../util/error-handler';
import { paymentCheckoutSchema } from '../util/zod/payment.schema';

const options = {
  OperationMode: 'Test',
  MercProfile: {
    MerchantID: process.env.MERCHANTID,
    HashKey: process.env.HASHKEY,
    HashIV: process.env.HASHIV,
  },
  IgnorePayment: [
    //    "Credit",
    //    "WebATM",
    //    "ATM",
    //    "CVS",
    //    "BARCODE",
    //    "AndroidPay"
  ],
  IsProjectContractor: false,
};

const paymentRouter = () => {
  const router = Router();

  router.get(
    '/payment',
    zodValidateMiddleware(paymentCheckoutSchema),
    (req: Request, res: Response) => {
      const { totalAmount, tradeDesc, itemName } = req.body;
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
        TotalAmount: totalAmount,
        TradeDesc: tradeDesc,
        ItemName: itemName,
        ReturnURL: `${process.env.HOST}/payment/return`,
        ClientBackURL: `${process.env.FRONTEND}/home`,
      };
      try {
        const create = new ecpay_payment(options);
        const html = create.payment_client.aio_check_out_all(baseParam);

        res.status(200).send(html);
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  // 後端接收綠界回傳的資料
  router.post('/payment/return', async (req: Request, res: Response) => {
    /* #swagger.ignore = true */

    try {
      const { CheckMacValue } = req.body;
      const data = { ...req.body };
      delete data.CheckMacValue; // 此段不驗證

      const create = new ecpay_payment(options);
      const checkValue = create.payment_client.helper.gen_chk_mac_value(data);

      console.log(
        '確認交易正確性：',
        CheckMacValue === checkValue,
        CheckMacValue,
        checkValue
      );

      res.send('1|OK');
    } catch (error) {
      throwAPIError({ res, error, statusCode: 400 });
    }
  });

  return router;
};
const paymentRoute = paymentRouter();

export default paymentRoute;
