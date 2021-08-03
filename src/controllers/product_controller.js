const Pool = require('pg').Pool;
const dbConfig = require('../config/db');
const dbQueriesProduct = require('../config/queries/product');
const field = require('../utils/field');

const pool = new Pool(dbConfig);

const newReponse = (message, typeResponse, body) => {
  return { message, typeResponse, body };
};

const dataToProduct = (rows) => {
  const Product = [];

  rows.forEach((element) => {
    Product.push({
      id: element.product_id,
      name: element.product_name,
      price: element.product_price,
      establishmentId: element.establishment_id,
      description: element.product_description,
    });
  });

  return Product;
};

const getProductByEstablishmentId = async (req, res) => {
  const { establishmentId } = req.params;
  const data = await pool.query(dbQueriesProduct.getProductByEstablishmentId, [
    establishmentId,
  ]);

  if (data) {
    data.rowCount > 0
      ? res.json(
          newReponse('Product found', 'Success', dataToProduct(data.rows))
        )
      : res.json(newReponse('Establishment without Prdocut', 'Success', []));
  } else {
    res.json(newReponse('Error searhing Prodcut', 'Error', {}));
  }
};

const createProduct = async (req, res) => {
  const { name, establishmentId, price, description, imageurl } = req.body;
  const errors = [];

  if (!field.checkFields([name, establishmentId, price, description])) {
    errors.push({ text: 'Empty fields' });
  }

  if (errors.length > 0) {
    res.json(newReponse('Errors detected', 'Fail', { errors }));
  } else {
    const data = await pool.query(dbQueriesProduct.createProduct, [
      name,
      price,
      description,
      establishmentId,
      imageurl,
    ]);

    data
      ? res.json(
          newReponse('Product created successfully', 'Success', {
            id: data.rows[0].product_ide,
          })
        )
      : res.json(newReponse('Error create Product', 'Error', {}));
  }
};

const updateProductById = async (req, res) => {
  const { price, name, id, type } = req.body;
  const errors = [];

  if (!field.checkFields([price, id, type, check])) {
    errors.push({ text: 'Empty fields' });
  }

  if (errors.length > 0) {
    res.json(newReponse('Errors detected', 'Fail', { errors }));
  } else {
    let data;

    switch (type) {
      case 'price':
        data = await pool.query(dbQueriesProduct.updateProductPriceById, [
          price,
          id,
        ]);
        break;

      default:
        data = await pool.query(dbQueriesProduct.updateProductById, [
          price,
          name,
          id,
        ]);
        break;
    }

    data
      ? res.json(newReponse('Product updated successfully', 'Success', {}))
      : res.json(newReponse('Error update Product', 'Error', {}));
  }
};

const deleteProductById = async (req, res) => {
  const { productId } = req.params;
  const data = await pool.query(dbQueriesProduct.deleteProductById, [
    productId,
  ]);

  data
    ? res.json(newReponse('Product deleted successfully', 'Success', {}))
    : res.json(newReponse('Error on delete with id', 'Error', {}));
};

module.exports = {
  createProduct,
  getProductByEstablishmentId,
  updateProductById,
  deleteProductById,
};
