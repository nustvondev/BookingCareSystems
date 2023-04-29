import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('mongodb is starting');
  } catch (error) {
    console.log(error);
  }
};
