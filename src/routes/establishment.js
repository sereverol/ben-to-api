const router = require('express').Router();
const establishment = require('../controllers/establishment_controller');

router.get('/establishment', establishment.getEstablishment);

router.get(
  '/establishement/establishmentId',
  establishment.getEstablishmentById
);

router.post('/', establishment.createEstablishment);

router.put('/', establishment.updateEstablishmentById);

router.delete('/:establishmentId', establishment.deleteEstablishmentById);

module.exports = router;
