import express from 'express';
import * as controller from './review.controller.js';

const router = express.Router();

router.post('/', controller.createReview);

router.get('/', controller.getAllReviews);

router.get('/supplier/:id', controller.getReviewsBySupplierId);

router.get('/:id', controller.getReviewById);

router.put('/:id', controller.updateReview);

router.delete('/:id', controller.deleteReview);



export default router