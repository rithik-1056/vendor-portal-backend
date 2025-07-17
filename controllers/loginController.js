const axios = require('axios');

exports.validateLogin = async (req, res) => {
  const { vendorId, password } = req.body;

  console.log("🔐 Incoming login request:", vendorId, password);

  try {
    // Step 1: Fetch CSRF token and session cookie
    const authHeader = 'Basic ' + Buffer.from(`${process.env.SAP_USERNAME}:${process.env.SAP_PASSWORD}`).toString('base64');

    const response = await axios.get(`${process.env.ODATA_URL}/LoginDetailsSet`, {  
    headers: {
    'Authorization': authHeader,
    'X-CSRF-Token': 'Fetch'
     }
    });

    const csrfToken = csrfResponse.headers['x-csrf-token'];
    const cookies = csrfResponse.headers['set-cookie'];

    if (!csrfToken || !cookies) {
      return res.status(500).json({ message: 'Failed to retrieve CSRF token or cookies' });
    }

    // ✅ Step 2: Send POST to OData (Create Entity)
    const odataPayload = {
      VendorId: vendorId,
      Password: password
    };

    const odataResponse = await axios.post(`${process.env.ODATA_URL}/LoginDetailsSet`, odataPayload, {
      auth: {
        username: process.env.SAP_USERNAME,
        password: process.env.SAP_PASSWORD
      },
      headers: {
        'X-CSRF-Token': csrfToken,
        'Cookie': cookies.join(';'),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const loginData = odataResponse.data?.d;

    if (loginData?.VendorId) {
      res.status(200).json({
        vendorId: loginData.VendorId
      });
    } else {
      res.status(401).json({ message: 'Login failed - Invalid data received' });
    }

  } catch (err) {
    console.error('🚨 Login Error:', err.response?.data || err.message);
    res.status(401).json({
      message: 'Invalid Vendor ID or Password',
      details: err.response?.data || err.message
    });
  }
};
