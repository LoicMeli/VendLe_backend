const Catalog = require('../models/catalog_model.js')



module.exports.createCatalog = (req, res, next)=>{
    console.log(req.body)
    
    const catalog= new Catalog ({
        ...req.body
    });
    catalog.save()
    .then((catalog)=> res.status(201).json({ 
        message: 'catalog created !',
        catalog:catalog
    }))
    .catch(error => {
        console.log(error);
        res.status(400).json({error});
    })
}
module.exports.getAllCatalog = (req, res, next)=>{
    console.log(req.body);
    Catalog.find()
    .then(Catalog =>res.status(200).json({catalog:Catalog}))
    .catch(error =>{res.status(400).json({error})
        console.log(error);
    });

}
module.exports.getOneCatalog =(req, res , next)=>{
    
    console.log(req.headers.id);
    Catalog.findOne({_id: req.headers.id})
    .then(Catalog =>res.status(200).json({catalog:Catalog}))
    .catch(error => res.status(400).json({error}));
}
module.exports.updateCatalog = (req, res, next)=>{
    console.log(req.body);
    Catalog.findOneAndUpdate({_id: req.params.id},
        {...req.body})
        .then(Catalog =>res.status(200).json({
            message: 'Catalogue  modifié !',
            catalog:Catalog
        }))
        .catch(error => {res.status(400).json({error})
            console.log(error);
    })
}
module.exports.deleteCatalog=(req, res, next)=>{
    console.log(req.body)
    Catalog.findOneAndDelete({ _id: req.params.id})
    .then(Catalog => res.status(200).json({
        message: 'Catalogue suprimé !',
            catalog:Catalog
    }))
    .catch(error =>{res.status(400).json({error})
        console.log(error);
})
}


module.exports.getCatalogByUser=(req,res,next)=>{
//authorID:req.body.authorID

    Catalog.find({})
    .then(catalogs=>{
        console.log(catalogs)
        res.json(groupBy(catalogs,function(item) {
            return [item.userID]
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


module.exports.addProduct=(req, res, next)=>{

    console.log(req.body)
    let id=getID(req.params.id)
    Catalog.updateOne({_id:req.params.id},{$addToSet:{products:req.body.productId}}) //addToSet permet d'ajouter un element dans un tableau
    .then(Catalog =>res.status(200).json({
            message: 'Product add succesfully!',
            catalog:Catalog
        }))
    .catch(error => res.status(400).json({error}));
}
function getID(id){
    return id;
}