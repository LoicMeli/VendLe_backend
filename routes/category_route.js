const express= require('express')
const router=express.Router()
const Category= require('../controllers/category_controller.js')


router.post('/category/create', Category.createCategory)
router.get('/category', Category.getAllCategory)
router.get('/category/one', Category.getOneCategory)
router.put('/category/update', Category.updateOneCategory)
router.delete('/Category/delete', Category.deleteCategory)

module.exports = router;