const express = require("express");
const app = express();
const router = express.Router();


router.get("/", (req, res) => {
  res.send("hello world");
})

router.get("/time", (req, res)=>{
  res.status(200).send(Date.now().toString())
})

app.use('/api', router);

module.exports = app