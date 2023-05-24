import express from 'express';
import specialtyController from '../controllers/specialty.controller.js';
let router = express.Router();

router.post('/create-new-specialty', specialtyController.createSpecialty);
router.get('/get-specialty', specialtyController.getAllSpecialty);
router.get(
  '/get-detail-specialty-by-id',
  specialtyController.getDetailSpecialtyById
);

export default router;
