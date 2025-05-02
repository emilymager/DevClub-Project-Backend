import express from 'express';
import * as controller from './supplier.controller.js';

const router = express.Router();

router.post('/supplier', controller.createSupplier);

router.get('/supplier', controller.getAllSuppliers);

router.get('/supplier/:id', controller.getSupplierById); 

router.put('/supplier/:id', controller.updateSupplier);

router.delete('/supplier/:id', controller.deleteSupplier);

export default router;
