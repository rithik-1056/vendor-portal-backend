const axios = require('axios');
const https = require('https');

const SAP_URL = process.env.SAP_URL;
const SAP_AUTH = {
  username: process.env.SAP_USERNAME,
  password: process.env.SAP_PASSWORD
};
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

exports.vendorLogin = async (req, res) => {
  const vendorId = req.query.VendorId;
  const password = req.query.Password;

  if (!vendorId || !password) {
    return res.status(400).json({ success: false, message: 'vendorId and password are required' });
  }

  const baseUrl = SAP_URL.endsWith('/') ? SAP_URL.slice(0, -1) : SAP_URL;

  try {
    const filter = encodeURIComponent(`VendorId eq '${vendorId}' and Password eq '${password}'`);
    const filterUrl = `${baseUrl}/LoginDetailsSet?$filter=${filter}`;

    const response = await axios.get(filterUrl, {
      auth: SAP_AUTH,
      headers: { 'Accept': 'application/json' },
      httpsAgent
    });

    const results = response.data.d.results;

    if (results.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('SAP Error:', err);
    const errorMsg = err.response?.data?.error?.message?.value || err.message || 'Unknown SAP error';
    res.status(500).json({ success: false, message: `Error calling SAP: ${errorMsg}` });
  }
};
