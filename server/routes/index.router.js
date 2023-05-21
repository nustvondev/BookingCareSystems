import express from 'express';
import authRoute from './auth.route.js';
import userRouter from './user.route.js';
import allCodeRouter from './allcode.route.js';
import doctorRouter from './doctor.router.js';
import patientRouter from "./patient.router.js"
let router = express.Router();

export let initWebRouters = (app) => {
  app.use('/api/auth', authRoute);
  app.use('/api', userRouter);
  app.use('/api', allCodeRouter);
  app.use('/api',doctorRouter);
  app.use('/api',patientRouter);
};
