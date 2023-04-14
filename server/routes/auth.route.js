import express from 'express';
let router = express.Router();
// import { regiser, login } from '../controllers/auth.controller.js';
import homeController from '../controllers/homeController.js';

router.post('/register', homeController.register);

export default router;
