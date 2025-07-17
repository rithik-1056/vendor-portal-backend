const express = require('express');
const router = express.Router();
const { getInvoices } = require('../controllers/invoiceController');

router.get('/:vendorId', getInvoices);

module.exports = router;
