import express from 'express';
import locationsController from '../controllers/locationsController.js';

const router = express.Router();

router.route('/')
    .get(locationsController.getLocations)
    .post(locationsController.createLocation);

router.route('/:id')
    .get(locationsController.getLocationById)
    .put(locationsController.updateLocation)
    .delete(locationsController.deleteLocation);

export default router;
