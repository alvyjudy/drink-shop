const {pool} = require("../db");

const pay = () => async (req, res, next) => {
  const {orderId, paymentReference} = req.body;
  await pool.query(`UPDATE orders
    SET payment_reference=$1
    WHERE order_id = $2;`, 
    [paymentReference, orderId]);
  next();
}

module.exports = {pay}

