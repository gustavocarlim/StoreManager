const { salesModel } = require('../models');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return { codeStatus: 200, data: sales };
};

const getSaleById = async (id) => {
  const erro = { err: { code: 'invalid_data', message: 'Sale not found' } };
  const sale = await salesModel.getSaleById(id);

  if (!sale) return { codeStatus: 404, data: erro };
  return { codeStatus: 200, data: sale }; 
};

module.exports = {
  getAllSales,
  getSaleById,
};