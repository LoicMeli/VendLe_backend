const mongoose=require('mongoose');
const { Schema } = mongoose;

const alertSchema = new Schema({

	username:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
		
	},
	email:{
		type:String,
		required:true
	},
	
	reason:[String],

    history:[{
		collectionName:String,
		column_name:String,
		oldValue:String,
		newValue:String,
		Datecreated:{
			type:Date
		},

		updateAt: Date
    }]
})

module.exports= mongoose.model('Alert', alertSchema);