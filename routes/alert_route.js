const express= require('express')
const router= express.Router();
const Alert=require('../controllers/alert_controller.js')

router.post('/alert/create', Alert.createAlert)
router.get('/alert', Alert.getAllAlert)
router.get('/alert/one', Alert.getOneAlert)
router.put('/alert/update', Alert.updateOneAlert)
router.delete('/alert/delete', Alert.deleteOneAlert)

module.exports=router;