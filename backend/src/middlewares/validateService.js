const { productModel } = require('../models');

const validateInsertSale = (newSale) => {
  if (!newSale.some((product) => product.productId)) { 
    return { codeStatus: 400, data: { message: '"productId" is required' } };
  }
  if (newSale.some((product) => product.quantity <= 0)) {
    return { codeStatus: 422,
      data: { message: '"quantity" must be greater than or equal to 1' } };
  }
  if (!newSale.some((product) => product.quantity)) {
    return { codeStatus: 400, data: { message: '"quantity" is required' } };
  }
};

const validateProductId = async (newSale) => {
  const validationPromises = newSale.map(async ({ productId }) => {
    const productExists = await productModel.findById(productId);
    return productExists ? null : { codeStatus: 404, data: { message: 'Product not found' } };
  });
  
  const results = await Promise.all(validationPromises);
  
  if (results.some((result) => result)) {
    return { codeStatus: 404, data: { message: 'Product not found' } };
  }
};
module.exports = { 
  validateInsertSale, 
  validateProductId };