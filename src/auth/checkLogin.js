const jwt = require("jsonwebtoken");

const {pool} = require('../db');

const checkLogin = () => async (req, res, next) => {
  try {
    const token = req.get("Authorization").split(" ")[1]
    console.log('token', token)
    const {userId} = jwt.decode(token, "temporarySecret")
    console.log('userId', userId)
    
    const result = (await pool.query(`SELECT 1 FROM session WHERE user_id = $1;`,
      [userId])).rows

    if (result.length === 1) {
      req.userId = userId
      next()
    } else {
      res.status(400).send("The user is not logged in")
    }
  } catch (e) {
    console.log("Error in checklogin middleware", e);
  }
}


module.exports = {checkLogin}