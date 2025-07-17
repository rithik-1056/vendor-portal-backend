const { callOData } = require('../services/sapODataService');

exports.getPurchaseOrders = async (req, res) => {
  const { vendorId } = req.params;
  try {
    const result = await callOData(`PurchaseOrderSet?$filter=VendorId eq '${vendorId}'`);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
