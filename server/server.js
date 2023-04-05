import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
mongoose.set('strictQuery', true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('mongodb is starting');
  } catch (error) {
    console.log(error);
  }
};

app.listen(process.env.BACKEND_PORT || 8800, () => {
  connect();
  console.log('backend is running');
});
