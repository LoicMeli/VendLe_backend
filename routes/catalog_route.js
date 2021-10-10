const express = require('express')
const router = express.Router();
const catalog= require('../controllers/catalog_controller.js')



router.post('/catalog/create',catalog.createCatalog)
router.get('/catalog',catalog.getAllCatalog)
router.get('/catalog/one',catalog.getOneCatalog)
router.put('/catalog/:id',catalog.updateCatalog)
router.delete('/catalog/:id',catalog.deleteCatalog)
router.get('/catalog/group',catalog.getCatalogByUser)
router.put('/catalog/addproduct/:id',catalog.addProduct)


module.exports= router;