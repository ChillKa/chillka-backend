import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import authRouter from './route/auth.route';

const app = express();

app.use(express.json());
app.use('/api', authRouter());

mongoose.connect(process.env.MONGODB_URL || '').then(() => {
  console.log('Connected to the database by mongoose');
});

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Example app listening at http://localhost:${process.env.PORT || 3000}`
  );
});
