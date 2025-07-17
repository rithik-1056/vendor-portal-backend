// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0; // Ignore SSL for development only

const app = express();
app.use(cors());
app.use(express.json());

// Route imports
app.use('/api/vendor-profile', require('./routes/vendorProfileRoutes'));
app.use('/api/rfq', require('./routes/requestForQuotationRoutes'));
app.use('/api/purchase-orders', require('./routes/purchaseOrderRoutes'));
app.use('/api/goods-receipts', require('./routes/goodsReceiptRoutes'));
app.use('/api/finance/overview', require('./routes/financialOverviewRoutes'));
app.use('/api/invoices', require('./routes/invoiceRoutes'));
app.use('/api/credit-debit-memos', require('./routes/creditDebitMemoRoutes'));
app.use('/api/login', require('./routes/loginRoutes'));

// Test SAP connectivity route
app.get('/api/test-sap', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.ODATA_URL}/LoginDetailsSet`, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${process.env.SAP_USERNAME}:${process.env.SAP_PASSWORD}`).toString('base64'),
        'X-CSRF-Token': 'Fetch',
        'Accept': 'application/json'
      }
    });

    res.status(200).json({
      success: true,
      message: 'Connected to SAP successfully!',
      csrfToken: response.headers['x-csrf-token']
    });
  } catch (err) {
    console.error('SAP connection error:', err.message);
    res.status(500).json({
      success: false,
      message: 'SAP connection failed',
      error: err.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
