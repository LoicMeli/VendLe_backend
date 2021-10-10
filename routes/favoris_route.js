const express= require('express')
const router= express.Router();
const Favoris=require('../controllers/favoris_controller.js')



router.put('/favoris/update/:id',Favoris.addFavoris)
router.get('/favoris/:id',Favoris.getAllFavoris)


module.exports=router;