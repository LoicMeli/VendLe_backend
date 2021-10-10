const mongoose=require('mongoose');
const { Schema } = mongoose;

const subCategorySchema = new Schema({
	name:{
		type:String,
		/*required:true*/
	},
	iconsUrl:{
		type:String,
		/*required:true*/
	},
	Datecreated:{
		type:Date
	},
	DateUpdated:{
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

module.exports=subCategorySchema;