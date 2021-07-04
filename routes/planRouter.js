const router = require('express').Router();
const planController = require('../controllers/planController');

router.get('/', planController.index);
router.post('/', planController.create);

module.exports = router;