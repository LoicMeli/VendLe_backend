const express = require('express');
const { articleHome , articleFavorites , topArticles, productCategoryPeerUser, productPeerUser} = require('../controllers/article_home_controller');
const Router =express.Router();

Router.get('/article/bycategory', articleHome)
Router.get('/toparticle', topArticles)
Router.get('/article/test/:id', productPeerUser )
Router.get('/article/test1/:id', productCategoryPeerUser)

module.exports = Router