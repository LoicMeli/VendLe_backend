const Category= require('../models/category_model')


module.exports.createCategory=(req, res, next)=>{
   
   console.log(req.body)
   const category= new Category({
   	  ...req.body
   })
category.save()

.then(Category=>{
	res.status(200).json({
		message:'category succesfully created',
		Category:Category
	})
})

 .catch(error=>{
 	res.status(400).json({error})
 	console.log(error)
 })

}


module.exports.getAllCategory=(req, res, next)=>{
   Category.find()
   .then(Category=>{
   	 res.status(200).json({Category:Category})
   })

   .catch(error=>{
   	res.status(400).json({error})
   	console.log(error)
   })

}

module.exports.getOneCategory=(req, res, next)=>{
	console.log(req.body)
	Category.findOne({_id: req.headers.id})

	.then(Category=>{
		res.status(200).json({Category:Category})
	})

	.catch(error=>{
		res.status(400).json({error})
	})
}

module.exports.updateOneCategory=(req, res, next)=>{
	console.log(req.body)
	Category.findOneAndUpdate({_id: req.headers.id},
         {...req.body}
    )

    .then(Category=>{
    	res.status(200).json({
             message:'category succesfully saved',
    		Category:Category
    	})
    })

    .catch(error=>{
    	res.status(400).json({error})
    })
}

module.exports.deleteCategory=(req, res, next)=>{
     Category.findOneAndDelete({_id: req.headers.id})

     .then(Category=>{
     	res.status(200).json({
     		message:'category succesfully deleted'
     	})
     })
      
      .catch(error=>{
      	res.status(400).json({error})
      })
}
