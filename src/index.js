const express = require("express");
const app = express();
const router = express.Router();

const {db} = require("./db");
const {products}  = require("./products");
const {signup} = require("./auth/signup");
const {login} = require("./auth/login");
const {checkLogin} = require("./auth/checkLogin");
const {logout} = require("./auth/logout");
const {getItems} = require("./cart/getItems");
const {addMinusItem} = require("./cart/addMinusItem");
const {removeItem} = require("./cart/removeItem");

router.get("/", (req, res) => {
  res.send("hello world");
})

router.get("/time", (req, res)=>{
  res.status(200).send(Date.now().toString())
})

router.get("/products", products(), (req, res)=>{
  res.json(req.products)
})


router.post("/auth/signup", 
  //Content-Type: application/json
  //Request body: {"email":<email>, "password":<password>}
  //Response: JWT token string
  express.json(), 
  signup(), 
  login(), 
  (req, res)=>{
  res.status(200).send(req.jwtToken)
})

router.post("/auth/login", 
  //Content-Type: application/json
  //Request body: {"email":<email>, "password":<password>}
  express.json(), 
  login(), 
  (req, res) => {
  res.status(200).send(req.jwtToken)
})

router.post("/auth/logout", 
  //Authorization: Bearer <jwtToken>
  logout(), 
  (req, res) => {
  res.status(200).send("Logged out")
})

router.get("/cart/get-items", checkLogin(), getItems(), (req, res)=>{
  //Authorization: Bearer <jwtToken>
  res.status(200).json(req.cartItems)
})

router.post("/cart/add-minus-item", 
  //Authorization: Bearer <jwtToken>
  //Content-Type: application/json
  //Request body: [<itemId>, <itemCount>] (integer value)
  express.json(), 
  checkLogin(), 
  addMinusItem(),
  (req, res)=>{
    res.status(200).send("Item has been added. Item ID:" + req.body[0]);
  }
)

router.post("/cart/remove-item", 
  //Authorization: Bearer <jwtToken>
  //Content-Type: application/json
  //Request body: [<itemId>] (integer value)
  express.json(),
  checkLogin(),
  removeItem(),
  (req, res)=>{
    res.status(200).send("Item has been removed. Item ID: "+req.body[0])
  }
)




app.use('/', router);

module.exports = {app}