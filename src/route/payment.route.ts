import ecpay_payment from 'ecpay_aio_nodejs';
import { Router } from 'express';

const { MERCHANTID, HASHKEY, HASHIV, HOST } = process.env;

const options = {
  OperationMode: 'Test', //Test or Production
  MercProfile: {
    MerchantID: MERCHANTID,
    HashKey: HASHKEY,
    HashIV: HASHIV,
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
let TradeNo;

const paymentRouter = () => {
  const router = Router();

  router.get('/payment', (req, res) => {
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
    TradeNo = 'test' + new Date().getTime();
    const baseParam = {
      MerchantTradeNo: TradeNo, //請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
      MerchantTradeDate,
      TotalAmount: '100',
      TradeDesc: '測試交易描述',
      ItemName: '測試商品等',
      ReturnURL: `${HOST}/payment/return`,
      ClientBackURL: `${HOST}/payment/clientReturn`,
    };
    const create = new ecpay_payment(options);

    const html = create.payment_client.aio_check_out_all(baseParam);
    console.log(html);

    // res.render('index', {
    //   title: 'Express',
    //   html,
    // });
    res.redirect(html);
  });

  // 後端接收綠界回傳的資料
  router.post('/payment/return', async (req, res) => {
    console.log('req.body:', req.body);

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
  });

  // 用戶交易完成後的轉址
  router.get('/payment/clientReturn', (req, res) => {
    console.log('clientReturn:', req.body, req.query);
    res.render('return', { query: req.query });
  });

  return router;
};
const paymentRoute = paymentRouter();

export default paymentRoute;
