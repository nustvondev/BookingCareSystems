import express from 'express';
import authRoute from './auth.route.js';
let router = express.Router();

export let initWebRouters = (app) => {

  app.use('/api/auth', authRoute);


};
