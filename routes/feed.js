import express from 'express';
const router = express.Router();
import {addFeedbackForm, addReview , showFeeds} from '../controllers/feedbackController.js'
import { authMiddleware } from '../middlewares/authMiddlewares.js';


// Feed add Route
router.post('/add', addFeedbackForm);
router.post('/review', authMiddleware , addReview);
router.get('/feeds', authMiddleware ,showFeeds)

export default router;