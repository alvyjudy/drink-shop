const express = require("express");
const app = express();
const router = express.Router();

const {products}  = require("./products");

router.get("/", (req, res) => {
  res.send("hello world");
})

router.get("/time", (req, res)=>{
  res.status(200).send(Date.now().toString())
})

router.get("/products", products(), (req, res)=>{
  res.json(req.products)
})


app.use('/', router);

module.exports = app