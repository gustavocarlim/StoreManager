const { salesService } = require('../services');

const getAllSales = async (req, res) => {
  const { codeStatus, data } = await salesService.getAllSales();
  return res.status(codeStatus).json(data);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { codeStatus, data } = await salesService.getSaleById(id);

  if (codeStatus === 404) return res.status(codeStatus).json({ message: 'Sale not found' });
  if (data.length === 0) return res.status(404).json({ message: 'Sale not found' });
  return res.status(codeStatus).json(data);
};

module.exports = {
  getAllSales,
  getSaleById,
};