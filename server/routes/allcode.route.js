import express from 'express';
import allCodeController from '../controllers/allcode.controller.js';
let router = express.Router();

router.get('/allcode', allCodeController.getAllCode);

export default router;
