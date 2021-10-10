const mongoose=require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({

	userID:{
		type:String,
		required:true
	},
	planID:{
		type:String,
		required:true
	},
	paymentID:{
		type:String,
		required:true
	},
	dateCreated:{
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

/*Recommended
-userID
-planID
-paymentID
*/