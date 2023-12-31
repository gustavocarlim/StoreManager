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

const insertProduct = async (name) => {
  const product = await productModel.insertProduct(name);

  const insertedProduct = { id: product, name: name.name };

  return { codeStatus: 201, data: insertedProduct };
};

const deleteProductById = async (productId) => {
  const productIds = await productModel.findById(productId);
  if (!productIds) {
    return {
      codeStatus: 404,
      data: { message: 'Product not found' },
    };
  }
  await productModel.deleteProductById(productId);
  return {
    codeStatus: 204,
  };
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  deleteProductById,
};