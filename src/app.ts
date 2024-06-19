import 'dotenv/config';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import swaggerUi from 'swagger-ui-express';
import Activity from './model/activity.model';
import User from './model/user.model';
import authRoute from './route/auth.route';
import messageRoute from './route/message-list.route';
import orderRoute from './route/order.route';
import paymentRoute from './route/payment.route';
import publicActivityRoute from './route/publicActivity.route';
import socketRoute from './route/socket.route';
import swaggerRoute from './route/swagger.route';
import userRoute from './route/user.route';
import userActivityRoute from './route/userActivity.route';
import swaggerDocument from './swagger/swagger-output.json';
import googleStrategy from './util/google-strategy';
import { mockActivity } from './util/mock/data';

const app = express();
const port = process.env.PORT;
const server = http.createServer(app);
const io = new Server(server);
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
  paymentRoute,
  messageRoute
);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);

// delete me in production
app.get('/api/demo', async (req, res) => {
  /* #swagger.description = 'Validate all of users' email' */

  await User.updateMany({ isEmailValidate: false }, { isEmailValidate: true });

  res.send('success validate email');
});

app.get('/api/mock-activity', async (req, res) => {
  const limit = req.query.limit;
  const quantity = limit && Number.isInteger(+limit) && +limit > 1 ? +limit : 1;
  for (const _ of [...Array(quantity)]) await Activity.insertMany(mockActivity);

  res.send(`success create ${quantity} activities`);
});

mongoose.connect(process.env.MONGODB_URL ?? '').then(() => {
  console.log('Connected to the database by mongoose');
});

socketRoute(io);

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
