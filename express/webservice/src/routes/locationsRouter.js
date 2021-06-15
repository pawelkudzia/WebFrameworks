import express from 'express';
import locationsController from '../controllers/locationsController.js';

const router = express.Router();

router.route('/').get(locationsController.getLocations);

export default router;
