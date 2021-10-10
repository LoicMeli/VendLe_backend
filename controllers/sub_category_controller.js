const subCategory= require('../models/sub_category_model.js')


module.exports.createSubCategory=(req, res, next)=>{
    console.log('req.body')
    const subCat= new subCategory({
    	...req.body
    });

    subCat.save()

    .then(subCategory=>{
    	res.status(200).json({
    		message:'sous categorie creee',
    		subCategory:subCategory
    	})
    })

    .catch(error=>{
    	res.status(400).json({error})
    	console.log(error)
    })

}