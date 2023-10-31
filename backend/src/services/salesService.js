const { validateInsertSale, validateProductId } = require('../middlewares/validateService');
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

const insertSale = async (sale) => {
  const error = validateInsertSale(sale);
  if (error) return error;
  const error2 = await validateProductId(sale);
  if (error2) return error2;

  const insertedSale = await salesModel.insertSale(sale);

  const resultData = {
    id: insertedSale,
    itemsSold: sale,
  };

  return { codeStatus: 201, data: resultData };
};

module.exports = {
  getAllSales,
  getSaleById,
  insertSale,
};