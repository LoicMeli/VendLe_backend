const Payment = require('../models/payment_model.js')


module.exports.createPayment=(req, res, next)=>{
    console.log(req.body)
    const payment= new  Payment({

        ...req.body
    });
    payment.save()
    .then((Payment)=> res.status(200).json({
        message: 'payment made',
        payment:Payment
    }))
    .catch(error =>{
        console.log(error);
        res.status(400).json({error});
    })
}
module.exports.getAllPayment=(req, res, next)=>{
    console.log(req.body);
    Payment.find()
    .then((Payment)=>res.status(200).json({Payment:Payment}))
    .catch(error =>{res.status(400).json({error})
    console.log(error);
})
}
module.exports.getOnePayment=(req, res, next)=>{
console.log(req.headers.id);
Payment.findOne({_id: req.headers.id})
.then(Payment=>res.status(200).json({payment:Payment}))
.catch(error => {res.status(400).json({error})
    console.log(error);
})

}
module.exports.updatePayment = (req, res, next)=>{
    console.log(req.headers.id);
    Payment.findOneAndUpdate({id: req.headers.id},
        {...req.body}
        )

    .then(Payment =>{
        res.status(200).json({
        message :'Payment update !',
        Payment:Payment
    })
})
    .catch(error => {res.status(400).json({error})
        console.log(error);
})
}
module.exports.deletePayment=(req, res, next)=>{
    console.log(req.headers);
    Payment.findOneAndDelete({_id: req.headers.id})
    .then(Payment => res.status(200).json({
        message: 'Payment delete ! ',
        Payment:Payment
    }))
    .catch(error =>{res.status(400).json({error})
        console.log(error)
})
}
