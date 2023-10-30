const camelize = require('camelize');
const connection = require('./connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT
        s.id AS saleId,
        s.date,
        sp.product_id,
        sp.quantity
        FROM sales s
        JOIN sales_products sp
        ON s.id = sp.sale_id;`,
  );
  return camelize(sales);
};
const getSaleById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT
        s.date,
        sp.product_id,
        sp.quantity
        FROM sales s
        JOIN sales_products sp
        ON s.id = sp.sale_id
        WHERE s.id = ?;`,
    [id], 
  );
  return camelize(sale);
};

const insertSale = async (sale) => {
  const query = 'INSERT INTO sales (date) VALUES (NOW())';

  const [insertResult] = await connection.execute(query);

  const saleId = insertResult.insertId;

  if (!Array.isArray(sale)) {
    const query2 = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)';
    const saleInfo = [saleId, sale.productId, sale.quantity];

    await connection.execute(query2, [...Object.values(saleInfo)]);

    return saleId;
  }

  const saleProducts = sale.map(({ productId, quantity }) => [saleId, productId, quantity]);

  const placeholders = saleProducts.map(() => '(?, ?, ?)').join(', ');

  const redSaleProducts = saleProducts.reduce((acc, values) => [...acc, ...values], []);

  const insertSaleProductsQuery = `INSERT INTO sales_products 
    (sale_id, product_id, quantity) VALUES ${placeholders}`;

  await connection.execute(insertSaleProductsQuery, redSaleProducts);

  return saleId;
};

module.exports = {
  getAllSales,
  getSaleById,
  insertSale,
};