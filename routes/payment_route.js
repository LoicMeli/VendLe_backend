const express = require('express')
const router = express.Router();
const Payment= require('../controllers/payment_controller.js')



router.post('/Payment/create',Payment.createPayment)
router.get('/Payment',Payment.getAllPayment)
router.get('/Payment/one',Payment.getOnePayment)
router.put('/Payment/update',Payment.updatePayment)
router.delete('/Payment/delete',Payment.deletePayment)
module.exports= router;
