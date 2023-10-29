const route = require('express').Router();
const { productsController } = require('../controllers');
const validateProduct = require('../middlewares/validateProduct');

route.get('/', productsController.getAllProducts);
route.get('/:id', productsController.getProductById);
route.post('/', validateProduct, productsController.insertProduct);

module.exports = route; 