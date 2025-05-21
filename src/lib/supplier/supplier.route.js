import express from 'express';
import * as controller from './supplier.controller.js';

const router = express.Router();

router.post('/', controller.createSupplier);

router.get('/', controller.getAllSuppliers);

router.get('/:id/history', controller.getHistoryBySupplierId);

router.get('/:id', controller.getSupplierById); 

router.put('/:id', controller.updateSupplier);

router.delete('/:id', controller.deleteSupplier);

router.post('/:id/review', controller.addReviewToSupplier);

router.post('/:id/event', controller.addEventToHistory);

export default router;
