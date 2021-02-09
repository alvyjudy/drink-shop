const {pool} = require("../db");

const getItems = () => async (req, res, next) => {
  const userId = req.userId
  const cart = (await pool.query(`SELECT 
    item_id, item_catalog_id, quantity, sugar, ice, tapioca, pudding, grassjelly
    FROM cart WHERE user_id = $1 ORDER BY item_id;`, [userId])).rows
  
  req.cartItems = cart.map(item=>{
    return {
      itemId: item["item_id"],
      itemCatalogId: item["item_catalog_id"],
      quantity: item.quantity,
      sugar: item.sugar,
      ice: item.ice,
      tapioca: item.tapioca,
      pudding: item.pudding,
      grassjelly: item.grassjelly,
    }
  })
  next();
}

module.exports = {getItems}