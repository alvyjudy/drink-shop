const jwt = require("jsonwebtoken");

const {pool} = require('../db');

const checkLogin = () => async (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1]
  const {userId} = jwt.decode(token, "temporarySecret")
  
  const result = (await pool.query(`SELECT 1 FROM session WHERE user_id = $1`,
    [userId])).rows

  if (result.length === 1) {
    req.userId = userId
    next()
  } else {
    res.status(400).send("The user is not logged in")
  }
}


module.exports = {checkLogin}