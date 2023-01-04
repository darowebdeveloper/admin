import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';

import clientRoute from './routes/client.js';
import generalRoute from './routes/general.js';
import salesRoute from './routes/sales.js';
import managementRoute from './routes/management.js';

import User from './models/User.js';
import { dataUser } from './data/index.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/client', clientRoute);
app.use('/general', generalRoute);
app.use('/management', managementRoute);
app.use('/sales', salesRoute);

const PORT = process.env.PORT || 5001;
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    // Only add data one time
    // User.insertMany(dataUser);
  })
  .catch((error) => console.log(`Error: ${error}`));
