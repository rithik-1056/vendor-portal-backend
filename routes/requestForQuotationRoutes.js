const express = require('express');
const router = express.Router();
const { getRFQs } = require('../controllers/requestForQuotationController');

router.get('/:vendorId', getRFQs);

module.exports = router;
