const products = () => (req, res, next) => {
  req.products = [
    {id:1, name: "classic", price: 5},
    {id:2, name: "original", price: 3},
    {id:3, name: "garden", price: 4}
  ]
  next()
}

module.exports = {products}