const express =require('express');
const Router=express.Router();

const Register=require('../controllers/register_controller.js');
const Login=require('../controllers/login_controller.js');

Router.post('/Register',Register.register);
Router.post('/Login',Login.login);
Router.get('/phoneverifiedSend', Register.phoneverifiedSend)
Router.get('/phoneverifyReceive', Register.phoneverifyReceive)
module.exports=Router