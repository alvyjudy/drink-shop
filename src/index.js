const express = require("express");
const app = express();
const router = express.Router();

const {db} = require("./db");
const {products}  = require("./products");
const {signup} = require("./signup");
const {login} = require("./login");
const {checkLogin} = require("./checkLogin");
const {logout} = require("./logout");

router.get("/", (req, res) => {
  res.send("hello world");
})

router.get("/time", (req, res)=>{
  res.status(200).send(Date.now().toString())
})

router.get("/products", products(), (req, res)=>{
  res.json(req.products)
})

router.post("/auth/signup", express.json(), signup(), login(), (req, res)=>{
  res.status(200).send(req.jwtToken)
})

router.post("/auth/login", express.json(), login(), (req, res) => {
  res.status(200).send(req.jwtToken)
})

router.post("/auth/logout", logout(), (req, res) => {
  res.status(200).send("Logged out")
})


app.use('/', router);

module.exports = app