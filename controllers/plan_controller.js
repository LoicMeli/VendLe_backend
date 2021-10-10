const Plan = require('../models/plan_model.js');



module.exports.createPlan =(req, res, next)=>{
   console.log(req.body)
   const plan = new Plan({
       ...req.body
   });
   plan.save()

   .then(()=> res.status(201).json({ 
   	 message: 'plan succesfully created',
   	 plan: plan
}))
   .catch(error => {res.status (400).json({error});
})

}

module.exports.getAllPlan =(req, res, next)=>{
	Plan.find()
	.then(Plan => res.status(200).json({Plan:Plan}))
	.catch(error =>{res.status(400).json({error})
            console.log(error)
  })
}



module.exports.getOnePlan =(req, res, next)=>{
	console.log(req.body)
   Plan.findOne({_id: req.headers.id})
   .then(Plan => res.status(200).json({Plan:Plan}))

   .catch(error =>{
   	   res.status(400).json({error})
   	   console.log(error)
   })
}

module.exports.updateOnePlan =(req, res, next)=>{
	console.log(req.body)
   Plan.findOneAndUpdate({_id: req.headers.id},
             {...req.body}
   	)

   .then(Plan=> {
   	  res.status(200).json({
        message:'plan succesfully saved',
   	  	Plan:Plan
   	  })
   })

   .catch(error=>{
   	  console.log(error);
   	  res.status(400).json(error)
   })

}

 module.exports.deletePlan =(req, res, next)=>{
 	Plan.findOneAndDelete({_id: req.headers.id})

 	.then(Plan=>{
 		res.status(200).json({
 			message:'plan deleted',
 			plan:Plan
 		})
 	})

 	.catch(error=>{
 		res.status(400).json({error})
 	})
 }