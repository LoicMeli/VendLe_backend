const mongoose =require('mongoose');
const { Schema } = mongoose;

  const chatSchema = new Schema({

	/*ownerID:{
		type:String,
		required:true
	},
	messages:[messageSchema],
	members:[String],
	productID:{
		type:String,
		required:true
	},
	dateCreated:{
    	type:Date
    },
    dateUpdated:{
    	type:Date
    },
    history:[{
	    oldrecord:[String],
	    newrecord:[String],
	    Datecreated:{
	        type:Date
	    }
	}]*/
	userID:{
		type:String,
		required:true
	},
	senderID:{
		type:String,
		required:true
	},
	username:{
		type:String,
		required:true
	},
	senderName:{
		type:String,
		required:true
	},
	message:String,
	productID:{
		type:String,
		required:true
	},
	timestamps:{}
})
module.exports=mongoose.model('Chat',chatSchema);
/*Recommended
-ownerID
-productID
*/