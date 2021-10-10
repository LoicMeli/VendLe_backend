  const Alert = require('../models/alert_model.js');
                                           

	module.exports.createAlert =(req,res,next)=>{

		console.log(req.body)
		const alert= new Alert({
			...req.body
		})
		alert.save()

		.then(Alert=> res.status(200).json({
			message:'alert succesfully created',
			Alert:Alert
		}))

		.catch(error=>{
			res.status(400).json({error})
			console.log(error)
		})
	}

	module.exports.getAllAlert=(req,res,next)=>{

		Alert.find()
		.then(Alert=>res.status(200).json({Alert:Alert}))
		.catch(error=>{
			res.status(400).json({error})
			console.log(error)
		})
	}

	module.exports.getOneAlert=(req,res,next)=>{
		console.log(req.body)
		Alert.findOne({_id: req.headers.id})
		.then(Alert=>res.status(200).json({Alert:Alert}))
		.catch(error=>{
				res.status(400).json({error})
				console.log(error)
			})
	}

	module.exports.updateOneAlert=(req,res,next)=>{
		console.log(req.body)
		Alert.findOneAndUpdate({_id: req.headers.id},
              {...req.body}
			)
		.then(Alert=>{
			res.status(200).json({
				message:'Alert succesfully saved',
				Alert:Alert
			})
		})
		.catch(error=>{
			console.log(error);
			res.status(400).json({error})
		})
	}

	module.exports.deleteOneAlert=(req,res,next)=>{
		Alert.findOneAndDelete({_id: req.headers.id})

		.then(Alert=>{
			res.status(200).json({
				message:'Alert deleted',
				Alert:Alert
			})
		})
		.catch(error=>{
			res.status(400).json({error})
		})
	}