const table = 'product';

module.exports = {
  createProduct: `INSERT INTO ${table} (product_name, product_price, establishment_ide) VALUES ($1, $2, $3) 
    RETURNING product_ide`,

  getAllProduct: `SELECT * FROM ${table}`,

  getProductById: `SELECT * FROM ${table} WHERE product_ide = $1`,

  getProductByEstablishmentId: `SELECT * FROM ${table} WHERE establishment_ide = $1`,

  getProductByPrice: `SELECT * FROM ${table} WHERE product_price = $1`,

  updateProductPriceById: `UPDATE ${table} SET product_price = $1 WHERE product_ide = $2`,

  updateProductById: `UPDATE ${table} SET product_name = $1, product_price = $2 WHERE product_ide = $3`,

  deleteProductById: `DELETE FROM ${table} WHERE product_ide = $1`,
};
