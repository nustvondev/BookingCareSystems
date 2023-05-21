
import express from 'express';
import patientController from '../controllers/patient.controller.js';
let router = express.Router();

router.post('/patient-book-appointment', patientController.postBookAppointment);

export default router;
