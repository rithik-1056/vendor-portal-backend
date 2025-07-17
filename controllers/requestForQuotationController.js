const { callOData } = require('../services/sapODataService');

exports.getRFQs = async (req, res) => {
  const { vendorId } = req.params;
  try {
    const result = await callOData(`RFQSet?$filter=VendorId eq '${vendorId}'`);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
