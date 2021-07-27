const table = 'product';

module.exports = {
  createProduct: `INSERT INTO ${table} (product_name, product_price, establishment_id) VALUES ($1, $2, $3) 
    RETURNING product_id`,

  getAllProduct: `SELECT * FROM ${table}`,

  getProductById: `SELECT * FROM ${table} WHERE product_id = $1`,

  getProductByEstablishmentId: `SELECT * FROM ${table} WHERE establishment_id = $1`,

  getProductByPrice: `SELECT * FROM ${table} WHERE product_price = $1`,

  updateProductPriceById: `UPDATE ${table} SET product_price = $1 WHERE product_id = $2`,

  updateProductById: `UPDATE ${table} SET product_name = $1, product_price = $2 WHERE product_id = $3`,

  deleteProductById: `DELETE FROM ${table} WHERE product_id = $1`,
};
