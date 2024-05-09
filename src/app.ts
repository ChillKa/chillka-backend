import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import authRouter from './route/auth.route';
import userRoute from './route/user.route';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/api', authRouter(), userRoute());

mongoose.connect(process.env.MONGODB_URL ?? '').then(() => {
  console.log('Connected to the database by mongoose');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
