const {pool} = require("../db");
const format = require("pg-format");

const placeOrder = () => async (req, res, next) => {
  const orderDetail = req.body;
  const userId = req.userId;
  const {order_id: orderId} = (await pool.query(`INSERT INTO orders
    (address, phone, name, user_id) VALUES ($1, $2, $3, $4) returning order_id;`, 
    Object.values(orderDetail).concat([userId]))).rows[0]


  const client = await pool.connect();
  await client.query(`BEGIN;`)
  try {

    const pasteboard = (await client.query(`DELETE FROM cart WHERE
    user_id = $1 returning *;`, [userId])).rows
    const values = pasteboard.map(item=>{
      const cart = Object.values(item);
      cart.pop()
      const orderedItem = cart.concat([orderId])
      return orderedItem
    })
    values.forEach(value=>{
      client.query(`INSERT INTO ordered_items VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9);`, value)
    })

    await client.query(`COMMIT`);
  } catch (e) {
    console.log("Error")
    client.query(`ROLLBACK;`);
  } finally {
    client.release();
  }

  req.orderId = orderId;
  next();
}

module.exports = {placeOrder}