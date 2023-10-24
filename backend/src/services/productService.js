const { productModel } = require('../models');

const getAllProducts = async () => {
  const products = await productModel.findAll();
  return { codeStatus: 200, data: products };
};

const getProductById = async (id) => {
  const erro = { err: { code: 'invalid_data', message: 'Product not found' } };
  const product = await productModel.findById(id);

  if (!product) return { codeStatus: 404, data: erro };
  return { codeStatus: 200, data: product }; 
};

module.exports = {
  getAllProducts,
  getProductById,
};