const jwt =require('jsonwebtoken');

const auth=(req,res,next)=>{
	try{
		const token=req.headers['x-access-token'];
		if(!token){
			return res.status(403).json({auth:false,message:'token not found !'})
		}
		jwt.verify(token,process.env.JWT_KEY,(err,decrypt)=>{
			if(err){
				return res.status(500).json({auth:false,message:'bad token provide or token expire'})
			}
			console.log(decrypt);
			if(req.body.userID === undefined || req.body.userID !==decrypt.user._id){
				throw 'Invalid User ID'
			}else{
				next();
			}
		})
	}
	catch(error){
		res.status(401).json({error:error.message,message:'invalid request !'})
	}
}
module.exports=auth;
//Fournir le token (dans le[x-access-token]) et le _id de l'utilisateur req.body pour passer ce middleware d'authentification