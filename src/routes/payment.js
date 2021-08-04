const router = require('express').Router();
const payment = require('../controllers/payment_controller');



router.post('/', payment.createPayment);


module.exports = router;
