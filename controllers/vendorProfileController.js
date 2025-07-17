const { callOData } = require('../services/sapODataService');

exports.getVendorProfile = async (req, res) => {
  const { vendorId } = req.params;
  try {
    const result = await callOData(`VendorProfileSet('${vendorId}')`);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
