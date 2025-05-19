import express from 'express';
import * as controller from './review.controller.js';

const router = express.Router();

router.post('/review', controller.createReview);

router.get('/review', controller.getAllReviews);

router.get('/review/supplier/:id', controller.getReviewsBySupplierId);

router.get('/review/:id', controller.getReviewById);

router.put('/review/:id', controller.updateReview);

router.delete('/review/:id', controller.deleteReview);



export default router