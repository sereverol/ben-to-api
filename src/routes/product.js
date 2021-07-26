const router = require('express').Router();
const product = require('../controllers/product_controller');

router.get('/ establishment/: establishmentId', product.getProductByEstablishmentId);

router.post('/', product.createProduct);

router.put('/', product.updateProductById);

router.delete('/:productId', product.deleteProductById);

module.exports = router;
