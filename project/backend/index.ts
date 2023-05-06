import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import configureRoutes from './http/routes';


dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json())
  .use(cors());

configureRoutes(app);

const db = mongoose.connection;


mongoose.connect(process.env.MONGODB_URL, {
  maxPoolSize: 10,
});

db.on('error', (err = {}) => {
  console.error(err);
});

db.on('open', async () => {
  console.log('Successfully connected to db');
});

app.listen(PORT, () => console.log(`server is listening to port ${PORT}`));

