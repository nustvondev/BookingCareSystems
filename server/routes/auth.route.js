import express from 'express';
import { regiser, login } from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/register', regiser);
router.post('/login', login);

export default router;
