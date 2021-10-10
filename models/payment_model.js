const mongoose =require('mongoose');
const {Schema} = mongoose;

const paymentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    dateCreated:{
        type:Date 
    }
})

module.exports= mongoose.model('Payment',paymentSchema);