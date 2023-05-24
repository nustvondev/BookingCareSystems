import express from 'express';
import clinicController from '../controllers/clinic.controller.js';
let router = express.Router();

router.post('/create-new-clinic', clinicController.createClinic);
router.get('/get-clinic', clinicController.getAllClinic);
router.get('/get-detail-clinic-by-id', clinicController.getDetailClinicById);

export default router;
