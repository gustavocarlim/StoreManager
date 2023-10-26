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

module.exports = {
  getAllSales,
  getSaleById,
};