const router = require('express').Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.index);
router.post('/', studentController.store);

module.exports = router;