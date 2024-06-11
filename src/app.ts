import 'dotenv/config';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import User from './model/user.model';
import authRoute from './route/auth.route';
import orderRoute from './route/order.route';
import paymentRoute from './route/payment.route';
import publicActivityRoute from './route/publicActivity.route';
import swaggerRoute from './route/swagger.route';
import userRoute from './route/user.route';
import userActivityRoute from './route/userActivity.route';
import swaggerDocument from './swagger/swagger-output.json';
import googleStrategy from './util/google-strategy';

const app = express();
const port = process.env.PORT;
const options = {
  customCss: '.swagger-ui .topbar { display: none }',
  swaggerOptions: {
    docExpansions: 'none',
    persistAuthorization: true,
    authorizations: {
      BearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
  },
};

googleStrategy();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', swaggerRoute, authRoute, publicActivityRoute);
app.use(
  '/api/auth',
  // #swagger.security = [{ "apiKeyAuth": [] }]
  userRoute,
  userActivityRoute,
  orderRoute,
  paymentRoute
);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);

// delete me in production
app.get('/api/demo', async (req, res) => {
  await User.updateMany({ isEmailValidate: false }, { isEmailValidate: true });

  res.send('success validate email');
});

// demo page until frontend page is ready
app.get('/api/demo/reset-password', async (req, res) => {
  // in production will redirect to 404 page
  let responseCode = '404 page not found';

  const token = req.query.validateCode as string;
  try {
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET!);

      responseCode = `
          此為重置密碼範例頁，等前端頁面好了之後，會再導向正確頁面<br><br>
          <form method='POST' action='/api/demo/reset-password'>
            <input name='password' type='password'>密碼</input>
            <br>
            <input name='confirmPassword' type='password'>確認密碼</input>
            <br><br>
          </form>
          在 postman 輸入符合規範的密碼、確認密碼、以下的 token 後，就可以測試重置密碼功能
          <br><br>
          Token <br>
          <textarea name='token' style="width:400px;height:100px">${token}</textarea>
          <br><br>
          <h1>此頁面在寄出重置密碼信的一天後失效</h1>
        `;
    }

    res.send(responseCode);
  } catch {
    res.send(responseCode);
  }
});

mongoose.connect(process.env.MONGODB_URL ?? '').then(() => {
  console.log('Connected to the database by mongoose');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
