import express from 'express';
import locationsController from '../controllers/locationsController.js';

const router = express.Router();

router.route('/').get(locationsController.getLocations);
router.route('/:id')
    .get(locationsController.getLocationById);

export default router;
