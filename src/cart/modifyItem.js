const {pool} = require("../db");

const modifyItem = () => async (req, res, next) => {
  await pool.query(`UPDATE cart
    SET quantity = $2,
        sugar = $3,
        ice = $4,
        tapioca = $5,
        pudding = $6,
        grassjelly = $7
    WHERE item_id = $1;`, Object.values(req.body))
  
  next()
}

module.exports = {modifyItem}