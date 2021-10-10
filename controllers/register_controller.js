const jwt =require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/user_model.js');
require('dotenv').config();
const config = require('../config');
const twilio = require('twilio');
const { application } = require('express');
const client = require("twilio")(config.acountSID , config.authToken)

module.exports.register=(req,res,next)=>{
	const {email,phone,gender,birthday,password,username}=req.body;
	console.log(req.body);
	bcrypt.hash(password,10)
	.then(hash=>{
		const user = new User({
			// email,
			// phone,
			// gender,
			// birthday,
			...req.body,
			password:hash,
			role:'user'
		})
		.then(user=>{
			if(!user)
				return res.status(400).json({error:'user are not created'})
			let token = jwt.sign({id:user._id},process.env.JWT_KEY);
			res.status(200).json({auth:true,token:token,message:'account created !',user:user});
			console.log(user);
		})
		.catch(error=>{
			res.status(500).json({message:'error ! account not created'});
			console.log('account',error);
		})
	})
	.catch(error=>console.log('bcrypt',error))
}

module.exports.phoneverifiedSend=(req,res,next)=>{
			client 
				.verify
				.services(config.serviceID)
				.verifications
				.create({
					body: 'Hello Verified your phone number',
					to : `+${req.query.phone}`,
					channel : req.query.channel
				})
				.then((data)=>{
				res.status(200).send(data)
				})
				.catch(error=>console.log(error))
	
}

module.exports.phoneverifyReceive=(req,res,next)=>{
	client
		.verify
		.services(config.serviceID)
		.verificationChecks
		.create({
			body: 'Hello successul verified',
			to : `+${req.query.phone}`,
			code: req.query.code 
		})
		.then((data)=>{
			res.status(200).send(data)
			})
		.catch(error=>console.log(error))
}
