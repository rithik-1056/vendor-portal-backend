// routes/loginRoutes.js
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Route for vendor login using POST
router.get('/', loginController.vendorLogin);

module.exports = router;