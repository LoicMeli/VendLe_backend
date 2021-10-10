const Product = require('../models/product_model');
const categorySchema = require ('../models/category_model');
const UserModel = require('../models/user_model');
const { ObjectID } = require('mongodb');

module.exports.articleHome = (req,res,next)=>{
    Product.find()
    .then(products => {
        const category = products.category   
        result = products.reduce(function (r, a) {
            r[a.category] = r[a.category] || [];
            r[a.category].push(a);
            return r;
        },
         Object.create(null));
    console.log(result);
    res.status(200).json(result)
    })
    .catch(error=> res.status(404).json(error))   
}

module.exports.topArticles = (req,res,next) => {
    Product.aggregate([
      {
        $project: {
          name: {
            $max: "$name"
          },
          description: {
            $max: "$description"
          },
          contact: {
            $max: "$contact"
          },
          photosUrls: [
            {
              $max: "$photosUrls"
            }
          ],
          category: {
            $max: "$category"
          },
          city: {
            $max: "$city"
          },
          country: {
            $max: "$country"
          },
          quarter: {
            $max: "$quarter"
          },
          price: {
            $max: "$price"
          },
          view: {
            $max: "$view"
          },
          dateCreated: {
            $max: "dateCreated"
          },
          dateUpdated: {
            $max: "$dateUpdated"
          },
          like: {
            $max: "$like"
          },
          signal: {
            $max: "$signal"
          },
          promotionStatus: {
            $max: "$promotionStatus"
          },
          status: {
            $max: "$status"
          },
          history: {
            $max: "$history"
          },
          
        }
      },
      {
        $limit: 10
      },
      {
        $sort: {
          "view": -1
        }
      },
      {
        $limit: 10
      }])
        .then( topproduct => res.status(200).json(topproduct))
        .catch(error=> res.status(404).json(error))
}

module.exports.productPeerUser= (req,res,next) =>{
  let id =req.params.id
  Product.find({ authorID:id} )
  .then( test => res.status(200).json({test:test}))
  .catch(error=> res.status(404).json(error))
}

module.exports.productCategoryPeerUser= (req,res,next) =>{
  let id =req.params.id
  Product.find({ authorID:id} )
  .then(products => {
    const category = products.category   
    result = products.reduce(function (r, a) {
        r[a.category] = r[a.category] || [];
        r[a.category].push(a);
        return r;
    },
     Object.create(null));
console.log(result);
res.status(200).json(result)
})
  .catch(error=> res.status(404).json(error))
 
}