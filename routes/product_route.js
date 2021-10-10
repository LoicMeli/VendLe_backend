const express= require('express');
const router=express.Router();
const Product= require('../controllers/product_controller.js')


router.post('/product/create', Product.createProduct)
router.get('/product', Product.getAllProduct)
router.get('/product/one', Product.getOneProduct)
router.put('/product/update', Product.updateOneProduct)
router.delete('/product/delete', Product.deleteProduct)
router.get('/product/group', Product.getProductCategory)

module.exports = router;