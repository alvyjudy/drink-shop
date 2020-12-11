const {pool} = require("../db");

const getOrders = () => async (req, res, next) => {
  const userId = req.userId

  const client = await pool.connect();

  const orders = (await client.query(`SELECT * FROM orders
    WHERE user_id = $1;`, [userId])).rows
  
  
  const ordersCamel = orders.map(item=>{
    return {
      orderId: item["order_id"],
      address: item["address"],
      phone: item["phone"],
      name: item["name"],
      paymentReference: item["payment_reference"],
    }
  })


  const ordersTotal = await Promise.all(ordersCamel.map(async (order)=>{
    const orderedItems = (await client.query(`SELECT * FROM ordered_items 
      WHERE order_id = $1`, [order.orderId])).rows
  
    const orderedItemsCamel = orderedItems.map(item=>{
      return {
        itemId: item["item_id"],
        itemCatalogId: item["item_catalog_id"],
        quantity: item["quantity"],
        sugar:item["sugar"],
        ice:item["ice"],
        tapioca:item["tapioca"],
        pudding:item.pudding,
        grassjelly:item.grassjelly
      }
    })
    
    return {...order, items: orderedItemsCamel}
  }))

  await client.release();
  
  req.orders = ordersTotal;
  next();
}

module.exports = {getOrders}