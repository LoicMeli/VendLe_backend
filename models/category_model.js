const mongoose=require('mongoose');
const { Schema } = mongoose;
const subCategory =require('./sub_category_model.js')

const categorySchema = new Schema({
	name:{
		type:String,
		required:true
	},
	iconsUrl:[String],
	subCategory:[subCategory],

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

module.exports= mongoose.model('Category', categorySchema);

/*Recommended
-Name
*/