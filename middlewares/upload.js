const mongoose=require('mongoose');
const gridStorage=require('multer-gridfs-storage');
const grid=require('gridfs-stream');
const multer=require('multer');
require('dotenv').config();

const connexion =mongoose.createConnection('mongodb://127.0.0.1:27017',{useUnifiedTopology:true,useNewUrlParser:true});
let gfs;
connexion.once('open',()=>{
	gfs=grid(connexion.db, mongoose.mongo);
	gfs.collection('Images');
})

const storage=new gridStorage({
	url:'mongodb://127.0.0.1:27017',
	file:(req,file)=>{
	
		return new Promise((resolve,reject)=>{
			const filename=file.originalname;
			const userID=req.params.id;
			const fileInfo={
				filename:filename,
				metadata:userID,
				bucketName:'Images',
			};
			resolve(fileInfo);
		})
	}
})

const fileFilter = (req, file, cb) => {
    if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
        cb(null, true);
    } else{
        cb(null, false);

    }

};

const upload=multer({storage: storage, fileFilter: fileFilter}).fields([{name:'profile'}]);

module.exports={upload,gfs};