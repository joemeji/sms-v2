const router = require('express').Router();
const studentController = require('../controllers/studentController');

router.post('/', studentController.store);
router.get('/', studentController.index);
router.get('/:studentId', studentController.get);
router.put('/:studentId', studentController.update);

router.get('/:studentId/deposit', studentController.getDeposits);
router.post('/:studentId/deposit', studentController.addDeposit);
router.put('/:studentId/deposit', studentController.updateDeposit);
router.delete('/:studentId/deposit/:depositId', studentController.deleteDeposit);

router.get('/:studentId/payment_list', studentController.getPaymentList);
router.put('/:studentId/payment_list/:paymentListId', studentController.updatePaymentList);

module.exports = router;