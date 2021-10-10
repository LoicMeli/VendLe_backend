const Service = require('../models/service_model')

module.exports.serviceHome = (req,res,next )=>{
  Service.find()
  .then(services => {
      const category = services.category   
      result = services.reduce(function (r, a) {
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

module.exports.topService = (req,res,next) => {
  Service.aggregate([
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
      $sort: {
        "view": -1
      }
    },
    {
      $limit: 10
    }
  ]
    )
      .then( topproduct => res.status(200).json(topproduct))
      .catch(error=> res.status(404).json(error))
}

module.exports.servicePeerUser= (req,res,next) =>{
  let id =req.params.id
  Product.find({ authorID:id} )
  .then( services => res.status(200).json({services:services}))
  .catch(error=> res.status(404).json(error))
}

module.exports.serviceCategoryPeerUser= (req,res,next) =>{
  let id =req.params.id
  Product.find({ authorID:id} )
  .then(services => {
    const category = services.category   
    result = services.reduce(function (r, a) {
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