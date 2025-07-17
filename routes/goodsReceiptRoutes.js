const express = require('express');
const router = express.Router();
const { getGoodsReceipts } = require('../controllers/goodsReceiptController');

router.get('/:vendorId', getGoodsReceipts);

module.exports = router;
