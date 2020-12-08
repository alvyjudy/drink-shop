const {db} = require("../db");

const removeItem = () => (req, res, next) => {
  const email = req.email;
  const itemId = req.body;
  db.removeItem(itemId, email);
  next();
}

module.exports = {removeItem}