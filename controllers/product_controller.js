const Product= require('../models/product_model')


module.exports.createProduct=(req, res, next)=>{
   
   console.log(req.body)
   const product= new Product({
   	  ...req.body
   })
product.save()

.then(Product=>{
	res.status(200).json({
		message:'product succesfully created',
		Product:Product
	})
})

 .catch(error=>{
 	res.status(400).json({error})
 	console.log(error)
 })

}


module.exports.getAllProduct=(req, res, next)=>{
   Product.find()
   .then(Product=>{
   	 res.status(200).json({Product:Product})
   })

   .catch(error=>{
   	res.status(400).json({error})
   	console.log(error)
   })

}

module.exports.getOneProduct=(req, res, next)=>{
	console.log(req.body)
	Product.findOne({_id: req.headers.id})

	.then(Product=>{
		res.status(200).json({Product:Product})
	})

	.catch(error=>{
		res.status(400).json({error})
	})
}

module.exports.updateOneProduct=(req, res, next)=>{
	console.log(req.body)
	Product.findOneAndUpdate({_id: req.headers.id},
         {...req.body}
    )

    .then(Product=>{
    	res.status(200).json({
             message:'category succesfully saved',
    		Product:Product
    	})
    })

    .catch(error=>{
    	res.status(400).json({error})
    })
}


module.exports.deleteProduct=(req, res, next)=>{
     Product.findOneAndDelete({_id: req.headers.id})

     .then(Category=>{
     	res.status(200).json({
     		message:'product succesfully deleted'
     	})
     })
      
      .catch(error=>{
      	res.status(400).json({error})
      })
}


//regroupe par categorie avec le authorID
module.exports.getProductCategory=(req,res,next)=>{
//authorID:req.body.authorID

    Product.find()
    .then(products=>{
        console.log(products)
        res.json(groupBy(products,function(item) {
            return [item.category, item.authorID]
        }))
        
    })
    .catch(error=>console.log(error.message));
}

function arrayFromObject(obj) {
    var arr = [];
    for (var i in obj) {
        arr.push(obj[i]);
    }
    return arr;
}

function groupBy(list, fn) {
    var groups = {};
    for (var i = 0; i < list.length; i++) {
        var group = JSON.stringify(fn(list[i]));
        if (group in groups) {
            groups[group].push(list[i]);
        } else {
            groups[group] = [list[i]];
        }
    }
    return arrayFromObject(groups);
}