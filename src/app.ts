import 'dotenv/config';
import express from 'express';
import { client } from './db';

const app = express();

client
  .connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(
    `Example app listening at http://localhost:${process.env.PORT || 3000}`
  );
});
