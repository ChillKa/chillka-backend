import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import authRouter from './route/auth.route';
import userRoute from './route/user.route';
import swaggerDocument from './swagger/swagger-output.json';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/api', authRouter(), userRoute());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(process.env.MONGODB_URL ?? '').then(() => {
  console.log('Connected to the database by mongoose');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
