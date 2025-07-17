const express = require('express');
const router = express.Router();
const { getPurchaseOrders } = require('../controllers/purchaseOrderController');

router.get('/:vendorId', getPurchaseOrders);

module.exports = router;
