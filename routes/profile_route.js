const express = require('express');
const Router =express.Router();
const auth=require('../middlewares/auth.js')
const Profile=require('../controllers/profile_controller.js');
const upload=require('../middlewares/upload.js')



Router.get('/profiles',Profile.getAllProfile)
Router.get('/profile/:id',Profile.getOneProfile)
Router.put('/profile/update',Profile.updateProfile)
Router.delete('/profile/:id',Profile.deleteProfile)
Router.get('/profile/image/:id',Profile.getProfileImage)
Router.get('/home',Profile.debut)
Router.patch('/profile/image/:id',upload.upload,Profile.updateProfileImage)
Router.put('/profile/edituser',Profile.editUser)

module.exports=Router;


