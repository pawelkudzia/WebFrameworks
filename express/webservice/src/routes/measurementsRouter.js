import express from 'express';
import measurementsController from '../controllers/measurementsController.js';

const router = express.Router();

router.route('/')
    .get(measurementsController.getMeasurements)
    .post(measurementsController.createMeasurement);

router.route('/:id')
    .get(measurementsController.getMeasurementById)
    .put(measurementsController.updateMeasurement)
    .delete(measurementsController.deleteMeasurement);

export default router;
