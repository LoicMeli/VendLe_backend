const mongoose = require("mongoose")
const User = require("../models/user_model")




module.exports.addFavoris=(req, res, next)=>{
	console.log(req.body)
	console.log(req.params.id)
	User.updateOne({_id:req.params.id},{$push:{favoris:req.body.productId }})
	.then(Favoris=>{
		res.status(200).json({
			message:'Favoris add succeffully',
			Favoris:Favoris
		})
	})

	.catch(error=>{
		res.status(400).json({error})
		console.log(error)
	})
}

module.exports.getAllFavoris=(req,res,next)=>{
	User.findOne({_id:req.params.id},{favoris:1})
	.then(favoris=>req.status(200).json({Favoris:favoris}))
	.catch(error=>res.status(500).json(error.message))
}