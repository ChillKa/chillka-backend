import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import authRoute from './route/auth.route';
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

app.use('/api', swaggerRoute, authRoute);
app.use(
  '/api/auth',
  // #swagger.security = [{ "apiKeyAuth": [] }]
  userRoute,
  userActivityRoute
);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);

mongoose.connect(process.env.MONGODB_URL ?? '').then(() => {
  console.log('Connected to the database by mongoose');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
