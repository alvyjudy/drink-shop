const {pool} = require("../db");

const addItemEntry = () => async (req, res, next) => { 
  const keys = Object.keys(req.body);
  //add compare keys
  const {item_id:itemId} = (await pool.query(`INSERT INTO cart 
    (item_catalog_id, quantity, sugar, ice, tapioca, pudding, grassjelly, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning item_id;`,
    Object.values(req.body).concat([req.userId])
  )).rows[0]
  
  req.itemId = itemId;
  next()
}

module.exports = {addItemEntry}