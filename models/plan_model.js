const mongoose=require('mongoose');
const { Schema } = mongoose;

  const planSchema = new Schema({
	name:{
		type:String,
		required:true
	},
	price:{
		type:Number,
		required:true
	},
	description:{
		type:String,
		required:true
	},
	productID:{
		type:String,
		required:true
	},
	catalogID:{
		type:String,
		required:true
	},
	duration:{
		type:String,
		required:true
	},
	dateCreated:{
    	type:Date,
    	default:Date.now()
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
	}]
})

  module.exports = mongoose.model('Plan', planSchema);
/*Recommended
-name
-price
-description
-productID
-catalogID
-duration
*/