const Message=require('../models/message_model.js');



module.exports.createMessage=(req,res,next)=>{

	console.log(req.body);
	const message=new Message({...req.body})
	message.save()
	.then(message=>res.status(201).json({message:'message was create successfully',
	Message:message
	}))
	.catch(error=>res.status(500).json({message:'message was not created',error:error.message}))
}

module.exports.getAllDiscussionMessages=(req,res,next)=>{
	//les messages renvoyées ici dépendent de l'id de la discussion fourni
	const id=req.params.discussionID
	Message.find({discussionID:id})
	.then(messages=>res.status(200).json({messages:messages}))
	.catch(error=>res.status(404).json({message:'No message for this discussion',error:error.message}))
}

module.exports.getAllMessages=(req,res,next)=>{

	Message.find()
	//.populate('product')
	.then(messages=>res.status(200).json({messages:messages}))
	.catch(error=>res.status(404).json({message:'An error occur',error:error.message}))
}

module.exports.getOneMessage=(req,res,next)=>{
	const id=req.params.id;

	Message.findOne({_id:id})
	.populate('product')
	.then(message=>res.status(200).json({message:message}))
	.catch(error=>res.status(404).json({message:'message not found',error:error.message}))
}

module.exports.deleteOneMessage=(req,res,next)=>{
	const id=req.headers.id
	Message.deleteOne({_id:id})
	.then(()=>res.status(201).json({message:'message was deleted successfully !'}))
	.catch(error=>{
		console.log(error);
		res.status(500).json({message:'message was not deleted',error:error.message})
	})
}

module.exports.deleteAllDiscussionMessage=(req,res,next)=>{
	//cette route sert a supprimer tous les messages d'une discussion
	const id=req.headers.id

	Message.deleteMany({discussionID:id})
	.then(()=>res.status(201).json({message:`les messages de la discussion ${id} ont bien été supprimés`}))
	.catch(error=>{
		console.log(error);
		res.status(500).json({message:'messages was not deleted',error:error.message})
	})
}

module.exports.updateMessage=(req,res,next)=>{

	const id=req.headers.id
	console.log(id)
	Message.findOneAndUpdate({_id:id},{...req.body})
	.then(message=>res.status(200).json({message:'message was updated successfully !',Message:message}))
	.catch(error=>res.status(404).json({message:'message was not updated !',error:error.message}))
}