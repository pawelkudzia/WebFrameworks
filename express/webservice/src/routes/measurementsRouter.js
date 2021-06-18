import express from 'express';
import measurementsController from '../controllers/measurementsController.js';

const router = express.Router();

router.route('/random')
    .get(measurementsController.getRandomMeasurement);

router.route('/location')
    .get(measurementsController.getRandomMeasurementWithLocation);

router.route('/queries')
    .get(measurementsController.getRandomMeasurementsByMultipleQueries);

router.route('/')
    .get(measurementsController.getMeasurements)
    .post(measurementsController.createMeasurement);

router.route('/:id')
    .get(measurementsController.getMeasurementById)
    .put(measurementsController.updateMeasurement)
    .delete(measurementsController.deleteMeasurement);

export default router;
