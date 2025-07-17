const { callOData } = require('../services/sapODataService');

exports.getInvoices = async (req, res) => {
  const { vendorId } = req.params;
  try {
    const result = await callOData(`InvoiceSet?$filter=VendorId eq '${vendorId}'`);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
