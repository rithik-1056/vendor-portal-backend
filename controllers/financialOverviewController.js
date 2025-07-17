const { callOData } = require('../services/sapODataService');

exports.getFinancialOverview = async (req, res) => {
  const { vendorId } = req.params;
  try {
    const result = await callOData(`FinancialOverviewSet('${vendorId}')`);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
