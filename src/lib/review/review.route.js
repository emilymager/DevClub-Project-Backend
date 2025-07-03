import express from 'express';
import * as controller from './review.controller.js';
import { authenticate } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/',authenticate, controller.createReview);

router.get('/', controller.getAllReviews);

router.get('/supplier/:id', controller.getReviewsBySupplierId);

router.get('/:id', controller.getReviewById);

router.put('/:id',authenticate, controller.updateReview);

router.delete('/:id',authenticate, controller.deleteReview);



export default router