const connection = require('./connection');
const {
  getFormattedColumnNames,
  getFormattedPlaceholders,
} = require('../utils/generateFormattedQuery');

const findAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id ASC',
  );
  return products;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return product;
};

const insertProduct = async (product) => {
  const columns = getFormattedColumnNames(product);
  const placeholders = getFormattedPlaceholders(product);

  const query = `INSERT INTO products (${columns}) VALUE (${placeholders})`;

  const [{ insertId }] = await connection.execute(query, [...Object.values(product)]);

  return insertId;
};

module.exports = {
  findAll,
  findById,
  insertProduct,
};