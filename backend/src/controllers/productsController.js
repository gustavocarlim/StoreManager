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

const insertProduct = async (req, res) => {
  const name = req.body;

  const { codeStatus, data } = await productsService.insertProduct(name);
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  return res.status(codeStatus).json(data);
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
};