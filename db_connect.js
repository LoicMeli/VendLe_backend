const mongoose=require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI,{
	useNewUrlParser:true,
	useUnifiedTopology:true
})
.then(()=>console.log('db is successfully connected !'))
.catch(()=>console.log('connection to db failed !'))

module.exports=mongoose;