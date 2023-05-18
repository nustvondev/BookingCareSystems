import express from 'express';
import doctorController from '../controllers/doctor.controller.js';
let router = express.Router();

router.get('/top-doctor-home', doctorController.getTopDoctorHome);
router.get('/get-all-doctors', doctorController.getAllDoctors);
router.post('/save-infor-doctors', doctorController.postInforDoctor);
router.get('/get-detail-doctor-by-id', doctorController.getDetailDoctorById);
router.post('/bulk-create-schedule', doctorController.bulkCreateSchedule);
router.get('/get-schedule-doctor-by-date', doctorController.getScheduleByDate);
export default router;
