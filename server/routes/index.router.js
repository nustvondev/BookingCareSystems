import express from 'express';
import authRoute from './auth.route.js';
import userRouter from './user.route.js';
let router = express.Router();

export let initWebRouters = (app) => {
  app.use('/api/auth', authRoute);
  app.use('/api', userRouter);
};
