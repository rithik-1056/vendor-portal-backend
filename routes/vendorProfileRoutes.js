// routes/vendorProfileRoutes.js
const express = require('express');
const router = express.Router();
const vendorProfileController = require('../controllers/vendorProfileController');

// GET vendor profile with VendorId as query param
// Example: GET /api/vendor-profile?vendorId=0000100000
router.get('/', vendorProfileController.getVendorProfile);

module.exports = router;
