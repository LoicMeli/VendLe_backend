const express= require('express')
const router= express.Router()
const subCategory= require('../controllers/sub_category_controller.js')



router.post('/subcat', subCategory.createSubCategory)

module.exports= router;