const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

require('dotenv').config();

// 🚨 Ignore self-signed certificate warning for SAP systems (for development)
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const app = express();

// ✅ Middleware
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Route Imports
const loginRoutes = require('./routes/loginRoutes');
const vendorProfileRoutes = require('./routes/vendorProfileRoutes');
// const requestForQuotationRoutes = require('./routes/requestForQuotationRoutes');
// const purchaseOrderRoutes = require('./routes/purchaseOrderRoutes');
// const goodsReceiptRoutes = require('./routes/goodsReceiptRoutes');
// const financialOverviewRoutes = require('./routes/financialOverviewRoutes');
// const invoiceRoutes = require('./routes/invoiceRoutes');
// const creditDebitMemoRoutes = require('./routes/creditDebitMemoRoutes');
const testSapRoutes = require('./routes/testSapRoutes');
// ✅ Routes
app.use('/api/vendor-login', loginRoutes);
app.use('/api/vendor-profile', vendorProfileRoutes);
// app.use('/api/rfq', requestForQuotationRoutes);
// app.use('/api/purchase-orders', purchaseOrderRoutes);
// app.use('/api/goods-receipts', goodsReceiptRoutes);
// app.use('/api/finance/overview', financialOverviewRoutes);
// app.use('/api/invoices', invoiceRoutes);
// app.use('/api/credit-debit-memos', creditDebitMemoRoutes);
app.use('/api', testSapRoutes);
// ✅ SAP Connection Test Route
app.get('/api/test-sap', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.ODATA_URL}/LoginDetailsSet`, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${process.env.SAP_USERNAME}:${process.env.SAP_PASSWORD}`).toString('base64'),
        'Accept': 'application/json'
      }
    });

    res.status(200).json({
      success: true,
      message: 'Connected to SAP successfully!',
      data: response.data
    });
  } catch (err) {
    console.error('❌ SAP connection error:', err.message);
    res.status(500).json({
      success: false,
      message: 'SAP connection failed',
      error: err.message
    });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
