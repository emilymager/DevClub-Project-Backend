import express from 'express';
import * as controller from './supplier.controller.js';

const router = express.Router();

router.post('/supplier', controller.createSupplier);

router.get('/supplier', controller.getAllSuppliers);

router.get('/supplier/:id/history', controller.getHistoryBySupplierId);

router.get('/supplier/:id', controller.getSupplierById); 

router.put('/supplier/:id', controller.updateSupplier);

router.delete('/supplier/:id', controller.deleteSupplier);

router.post('/supplier/:id/review', controller.addReviewToSupplier);

router.post('/supplier/:id/event', controller.addEventToHistory);

export default router;
