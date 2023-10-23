const { productsModel } = require('../models');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return { codeStatus: 200, data: products };
};

const getProductById = async (id) => {
  const erro = { err: { code: 'invalid_data', message: 'Wrong id format' } };
  const product = await productsModel.getProductById(id);
  console.log(product);

  if (product.err) return { codeStatus: 404, data: erro };
  return { codeStatus: 200, data: product }; 
};

module.exports = {
  getAllProducts,
  getProductById,
};