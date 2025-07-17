const express = require('express');
const router = express.Router();
const { getFinancialOverview } = require('../controllers/financialOverviewController');

router.get('/:vendorId', getFinancialOverview);

module.exports = router;
