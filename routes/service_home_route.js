const express = require('express');
const Router =express.Router();
const {serviceHome,topService,servicePeerUser,serviceCategoryPeerUser} = require('../controllers/service_home_controller')

Router.get('/service/bycategory', serviceHome)
Router.get('/topservice',topService)
Router.get('/service/servicePeerUser',servicePeerUser)
Router.get('/service/serviceCategoryPeerUser',serviceCategoryPeerUser)



module.exports = Router