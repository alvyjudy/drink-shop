const express = require("express");
const router = express.Router();

const {db} = require("./db");
const {products}  = require("./products");
const {signup} = require("./auth/signup");
const {login} = require("./auth/login");
const {checkLogin} = require("./auth/checkLogin");
const {logout} = require("./auth/logout");
const {getItems} = require("./cart/getItems");
const {addItemEntry} = require("./cart/addItemEntry");
const {modifyItem} = require("./cart/modifyItem");
const {removeItem} = require("./cart/removeItem");
const {placeOrder} = require("./orders/placeOrder");
const {pay} = require("./orders/pay");
const {getOrders} = require("./orders/getOrders");

router.get("/", (req, res) => {
  res.send("hello world");
})

router.get("/time", (req, res)=>{
  res.status(200).send(Date.now().toString())
})

router.get("/products", products(), (req, res)=>{
  res.json(req.products)
})

router.post("/auth/validate-token", 
  //Authorization: Bearer <jwtToken>
  checkLogin(),
  (req, res)=>{
    res.status(200).send("Valid token");
  }
)


router.post("/auth/signup", 
  //Content-Type: application/json
  //Request body: {"email":<email>, "password":<password>}
  //Response: JWT token string
  express.json(), 
  signup(), 
  login(), 
  (req, res)=>{
  res.status(200).json({token: req.token})
})

router.post("/auth/login", 
  //Content-Type: application/json
  //Request body: {"email":<email>, "password":<password>}
  express.json(), 
  login(), 
  (req, res) => {
  res.status(200).json({token:req.token})
})

router.post("/auth/logout", 
  //Authorization: Bearer <jwtToken>
  logout(), 
  (req, res) => {
    res.status(200).send("User has been logged out")
})

router.post("/cart/add-item-entry", 
  //Authorization: Bearer <jwtToken>
  //Content-Type: application/json
  express.json(),
  checkLogin(), 
  addItemEntry(),
  (req, res) => {
    res.status(200).json({itemId: req.itemId})
  }
)

router.put("/cart/modify-item",
  express.json(),
  checkLogin(),
  modifyItem(),
  (req, res)=>{
    res.status(200).send("Item has been updated");
  }
)

router.delete("/cart/remove-item",
  express.json(),
  checkLogin(),
  removeItem(),
  (req, res) => {
    res.status(200).send("Item has been removed");
  });

router.get("/cart/get-items", 
  checkLogin(), 
  getItems(), (req, res)=>{
    res.status(200).json(req.cartItems)
})

router.post("/orders/place-order", 
  express.json(),
  checkLogin(),
  placeOrder(),
  (req, res)=>{
    res.status(200).json({orderId: req.orderId})
  }
)

router.put("/orders/pay", 
  express.json(),
  checkLogin(),
  pay(),
  (req, res) => {
    res.status(200).send("Payment completed")
  })

router.get("/orders/get-orders",
  checkLogin(),
  getOrders(),
  (req, res) => {
    res.status(200).json(req.orders);
  })




module.exports = router;