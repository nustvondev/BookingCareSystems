import express from 'express';
import authRoute from './auth.route.js';
let router = express.Router();

export let initWebRouters = (app) => {
  // router.get('/api', homeController.getTestapi);
  // router.get('/test', homeController.getTestapi2);
  app.use('/api/auth', authRoute);
};
