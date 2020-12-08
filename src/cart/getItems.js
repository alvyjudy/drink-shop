const {db} = require("../db");

const getItems = () => (req, res, next) => {
  const email = req.email;
  req.cartItems = db.getItems(email)
  next();
}

module.exports = {getItems}