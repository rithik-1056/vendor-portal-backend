const express = require('express');
const router = express.Router();
const { getVendorProfile } = require('../controllers/vendorProfileController');

router.get('/:vendorId', getVendorProfile);
module.exports = router;
