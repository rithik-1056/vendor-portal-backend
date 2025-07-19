const express = require('express');
const router = express.Router();
const axios = require('axios');
const https = require('https');

const SAP_URL = process.env.SAP_URL;
const SAP_AUTH = {
  username: process.env.SAP_USERNAME,
  password: process.env.SAP_PASSWORD
};

const agent = new https.Agent({ rejectUnauthorized: false });

router.get('/test-sap', async (req, res) => {
  try {
    const response = await axios.get(`${SAP_URL}/$metadata`, {
      auth: SAP_AUTH,
      httpsAgent: agent
    });

    return res.json({ success: true, message: 'SAP connection successful', data: response.data });
  } catch (err) {
    return res.json({ success: false, message: 'SAP connection failed', error: err.message });
  }
});

module.exports = router;
