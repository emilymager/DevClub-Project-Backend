const express = require('express');
const { createSupplier, getAllSuppliers, getSupplierById,updateSupplier,deleteSupplier } = require('./supplier.controller');

const router = express.Router();

router.post('/supplier', createSupplier);

router.get('/supplier', getAllSuppliers);

router.get('/supplier/:id', getSupplierById); 

router.put('/supplier/:id', updateSupplier);

router.delete('/supplier/:id', deleteSupplier);

module.exports = router;
