
const User = require ('../models/user_model');
const Token = require('../models/forgot_password_model');
const crypto = require ('crypto');
const bcrypt = require ('bcrypt')
const mongoose = require ('mongoose');
const nodemailer = require ('nodemailer');
const { error } = require('console');
const twilio = require('twilio');
const config = require('../config')
const client = require("twilio")(config.acountSID , config.authToken)


const getAllToken=(req,res,next)=>{

    Token.find()
    .then(token=>res.json(token))
    .catch(error=>res.json(error.message))
}


const resetPassword = async (req, res, next)=>{
    console.log(req.body.phonenumber)
    if (!req.body.phonenumber)
    {
        return res
        .status (500)
        .json({message: "phonenumber is required"});
    }
    const user = await User.findOne ({
        phonenumber: req.body.phonenumber
    });
    console.log('user',user);
        if(!user)
        {
            return res
            .status (500)
            .json({message:"phonenumber does not exist"});
        }

        var token = new Token ({userId: user.id, resettoken: crypto.randomBytes(3).toString('hex').toUpperCase()})
        token.save (function(err){
            if (err)
            {
                console.log(err)
                return res
                .status (500)
                .send({msg: err.message});
            } 
            Token.find({_userId: user.id, resettoken:{$ne: token.resettoken}})
            .remove().exec();
            res
            .status(200)
            .json({message: "Reset Password succesfuly !"});
            client
            .messages
            .create
            ({ 
                body :`your password reset token is :+${token.resettoken}` ,
                to : `+${req.body.phone}`,
                from: "numeros a acheter sur twilio",
                channel : req.body.channel
            })
            .then((data)=>{
                res.status(200).send(data)
                })
            .catch(error=>console.log(error))
            }
        )}

const validPasswordToken = async (req, res)=>{
            if(!req.body.code){
                return res
                .status(500)
                .json({message:"token is required"});
            }
            const user = await Token.findOne({
               resettoken: req.body.code 
              
            });
            
            if(!user){
                return res
                .status (409)
                .json ({message: 'Code invalide'});
            }
            User.findOneAndUpdate({id: user.userId})
                .then(()=>{
                    res
                .status(200)
                .json({message:'Token verified succesfully.'});
                })
                .catch((err)=>{
                    return res
                    .status(500)
                    .send({msg:err.message});
                   
                });
}

const newPassword =async (req, res)=>{
    Token.findOne({resettoken: req.body.code}, function (err,userToken, next){
            if(!userToken){
                return res
                .status(409)
                .json({message: 'Token has expired'});
            }
        User.findOne({
            _id: userToken.userId
        }, function (err, user, next){
            if(!user){
                return res
                .status(409)
                .json({message: 'User does not exist'});
            }
            return bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    console.log(err)
                  return res
                    .status(400)
                    .json({ message: 'Error hashing password' });
            }
            user.password = hash;
                  user.save(function (err) {
                    if (err) {
                      return res
                        .status(400)
                        .json({ message: 'Password can not reset.' });
                    } else {
                      userToken.remove();
                      return res
                        .status(201)
                        .json({ message: 'Password reset successfully' });
            }
        });
                
    });
});
    })
}
module.exports={
        resetPassword:resetPassword,
        validPasswordToken:validPasswordToken,
        newPassword:newPassword,
        getAllToken:getAllToken,
        
}
