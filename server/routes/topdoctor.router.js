import express from 'express';
import doctorController from '../controllers/doctor.controller.js';
let router = express.Router();

router.get('/top-doctor-home', doctorController.getTopDoctorHome);

export default router;