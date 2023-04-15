import express from 'express';
let router = express.Router();
// import { regiser, login } from '../controllers/auth.controller.js';
import homeController from '../controllers/homeController.js';

router.post('/register', homeController.register);
router.get('/test', homeController.getTestapi2);
router.post('/login', homeController.login);
router.post('/logout', homeController.logout);

export default router;
