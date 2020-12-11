const {db} = require("../db");

const addMinusItem = () => (req, res, next) => {
  const email = req.email;
  const [itemId, count] = req.body;
  db.addMinusItem(itemId, count, email);
  next();
}

module.exports = {addMinusItem}