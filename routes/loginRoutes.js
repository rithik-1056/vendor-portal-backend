// loginRoutes.js
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// router.get('/', (req, res) => {
//   res.send('Login API is up! Use POST to log in.');
// });
router.post('/', loginController.validateLogin);

module.exports = router;
