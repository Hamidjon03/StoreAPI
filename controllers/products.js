const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {

  // const search = 'ab'

  const products = await Product.find({}).sort('-name price')
  res.status(200).json({products, nbHits: products.length})
}

const getAllProducts = async (req, res) => {
  const {featured, company, name, sort, fields} = req.query
  const queryObj = {}

  if(featured){
    queryObj.featured = featured === 'true' ? true : false
  }

  if (company) {
    queryObj.company = company
  }

  if (name) {
    queryObj.name = {$regex: name, $options: 'i'}
  }

  // console.log(queryObj)

  let result = Product.find(queryObj)
  //sort
  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.sort('createdAt')
  }

  if (fields) {
    const fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
  }

  const products = await result
  res.status(200).json({products, nbHits: products.length})
}

module.exports = {
  getAllProducts,
  getAllProductsStatic
}