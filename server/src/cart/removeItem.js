const {pool} = require("../db");

const removeItem = () => async (req, res, next) => {
  try {
    await pool.query(`DELETE FROM cart WHERE item_id = $1;`, 
    Object.values(req.body))
  } catch (e) {
    console.log(e)
    res.status(400).send("Update failed (itemId likely does not exist")
  }
  next();
}

module.exports = {removeItem}