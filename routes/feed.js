import express from 'express';
const router = express.Router();
import {addFeedbackForm} from '../controllers/feedbackController.js'


// Feed add Route
router.post('/add', addFeedbackForm);

export default router;