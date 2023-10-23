const { productsService } = require('../services');

const getAllProducts = async (req, res) => {
  const { codeStatus, data } = await productsService.getAllProducts();
  return res.status(codeStatus).json(data);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { codeStatus, data } = await productsService.getProductById(id);

  if (codeStatus === 404) return res.status(codeStatus).json({ message: 'Product not found' });

  return res.status(codeStatus).json(data);
};

module.exports = {
  getAllProducts,
  getProductById,
};