// controllers/vendorProfileController.js
const axios = require('axios');
const https = require('https');

// Get SAP details from .env
const SAP_URL = process.env.SAP_URL;
const SAP_AUTH = {
  username: process.env.SAP_USERNAME,
  password: process.env.SAP_PASSWORD,
};

// Disable TLS certificate check for SAP self-signed certs
const agent = new https.Agent({ rejectUnauthorized: false });

// ✅ MAIN FUNCTION TO EXPORT
exports.getVendorProfile = async (req, res) => {
  const vendorId = req.query.VendorId;

  if (!vendorId) {
    return res.status(400).json({ error: 'Missing VendorId' });
  }

  try {
    const odataUrl = `${SAP_URL}/VendorProfileSet?$filter=VendorId eq '${vendorId}'`;
    const response = await axios.get(odataUrl, {
      auth: SAP_AUTH,
      httpsAgent: agent,
      headers: { Accept: 'application/json' },
    });

    const results = response.data.d.results;

    if (results.length === 0) {
      return res.status(404).json({ error: 'Vendor profile not found' });
    }

    return res.json(results[0]); // Return the first matched profile
  } catch (error) {
    console.error('Error fetching vendor profile:', error?.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to fetch vendor profile' });
  }
};
