const express = require('express');
const router = express.Router();
const { getCreditDebitMemos } = require('../controllers/creditDebitMemoController');

router.get('/:vendorId', getCreditDebitMemos);

module.exports = router;
