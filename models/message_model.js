const mongoose=require('mongoose');
const { Schema } = mongoose;

  const messageSchema = new Schema({
	sender:{
		username:String,
		senderID:String
	},
	content:{
		type:String,
	},
	receiver:{
		username:String,
		senderID:String
	},
	dateCreated:{
    	type:Date,
    	default:Date.now()
    },
    discussionID:{type:String,required:true},
	product:{
		type:Schema.Types.ObjectId,
		ref: "Product"
	}
},{timestamp:true})

module.exports=mongoose.model('Message',messageSchema);
/*Recommended
-senderID
-receiverID
*/