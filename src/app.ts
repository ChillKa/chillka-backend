import 'dotenv/config';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import swaggerUi from 'swagger-ui-express';
import Activity from './model/activity.model';
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
import { searchAndSaveImages } from './util/download-unsplash';
import googleStrategy from './util/google-strategy';
import { importMockActivity } from './util/mock/import';

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

  const activities = await Activity.find({});
  // const locationValues = Object.values(LocationEnum);
  let count = 0;
  for (const activity of activities) {
    if (!activity.lat) count++;
    // activity.creatorId = new mongoose.Types.ObjectId();
    // activity.location = faker.helpers.arrayElement(locationValues);
    // activity.organizer = {
    //   profilePicture: faker.image.urlLoremFlickr(),
    //   name: faker.person.fullName(),
    //   contactName: faker.person.fullName(),
    //   contactPhone: faker.phone.number(),
    //   contactEmail: faker.internet.email(),
    //   websiteName: faker.internet.domainName(),
    //   websiteURL: faker.internet.url(),
    // };
    // activity.lat = faker.location.latitude();
    // activity.lng = faker.location.longitude();
    // await activity.save();
  }

  console.log(count);
  // await User.updateMany({ isEmailValidate: false }, { isEmailValidate: true });

  res.send('success validate email');
});

app.get('/api/unsplash', async (req, res) => {
  /* #swagger.description = 'download picture from unsplash' */
  const limit = req.query.limit as string;
  const categories = {
    // user: 'Asian person, Asian portrait, Asian face, Asian woman, Asian man',
    // art: 'art, culture, painting, sculpture',
    // games: 'gaming, video games, board games, esports',
    // health: 'healthy, wellness, yoga, nutrition',
    // hobbies: 'hobby, crafting, painting, photography',
    // outdoor: 'hiking, nature, trail, outdoor',
    // social: 'social, gathering, party, event',
    // sports: 'fitness, workout, sports, exercise',
    // technology: 'technology, gadgets, tech, innovation',
  };

  const promises = Object.entries(categories).map(([category, query]) =>
    searchAndSaveImages({ category, query, limit })
  );
  await Promise.all(promises);

  res.send('success download picture from unsplash');
});

app.get('/api/mock-activity', async (req, res) => {
  const limit = req.query.limit;
  const quantity = limit && Number.isInteger(+limit) && +limit > 1 ? +limit : 1;
  await importMockActivity(quantity);

  res.send(`success create ${quantity} activities`);
});

mongoose.connect(process.env.MONGODB_URL ?? '').then(() => {
  console.log('Connected to the database by mongoose');
});

socketRoute(io);

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
