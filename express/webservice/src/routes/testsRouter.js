import express from 'express';
import testsController from '../controllers/testsController.js';

const router = express.Router();

router.route('/json').get(testsController.json);
router.route('/plaintext').get(testsController.plaintext);
router.route('/base64').get(testsController.base64);

export default router;
