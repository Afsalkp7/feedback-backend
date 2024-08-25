import express from 'express';
const router = express.Router();
import {addFeedbackForm, addReview} from '../controllers/feedbackController.js'
import { authMiddleware } from '../middlewares/authMiddlewares.js';


// Feed add Route
router.post('/add', addFeedbackForm);
router.post('/review', authMiddleware , addReview);

export default router;