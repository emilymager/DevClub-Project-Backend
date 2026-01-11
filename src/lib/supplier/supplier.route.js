import express from 'express';
import * as controller from './supplier.controller.js';
import { authenticate } from '../../middleware/authMiddleware.js';

console.log("bye");
const router = express.Router();

router.get('/my', authenticate, controller.getMySupplier);

router.post('/',authenticate, controller.createSupplier);

router.get('/', controller.getAllSuppliers);

router.get('/:id/history', controller.getHistoryBySupplierId);

router.get('/:id', controller.getSupplierById); 

router.put('/:id',authenticate, controller.updateSupplier);

router.delete('/:id',authenticate, controller.deleteSupplier);

router.post('/:id/review',authenticate, controller.addReviewToSupplier);

router.post('/:id/event',authenticate, controller.addEventToHistory);



export default router;