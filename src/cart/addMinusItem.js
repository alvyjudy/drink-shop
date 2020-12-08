const {db} = require("../db");

const addMinusItem = () => (req, res, next) => {
  const email = req.email;
  const item = req.body;
  db.addMinusItem(item, email);
  next();
}

module.exports = {addMinusItem}