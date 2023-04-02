const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({featured: false})
  res.status(200).json({products, nbHits: products.length})
}

const getAllProducts = async (req, res) => {
  const {featured} = req.query
  const queryObj = {}

  if(featured){
    queryObj.featured = featured === 'true' ? true : false
  }

  console.log(queryObj)

  const products = await Product.find(queryObj)
  res.status(200).json({products, nbHits: products.length})
}

module.exports = {
  getAllProducts,
  getAllProductsStatic
}