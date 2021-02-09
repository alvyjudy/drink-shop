const jwt = require("jsonwebtoken");

const {pool} = require("../db");

const signup = () => async (req, res, next) => {
  try {
    const {email, password} = req.body;
    //check email duplicate
    const result = (await pool.query(`SELECT 1 FROM users WHERE email = $1;`, 
      [email])).rows;

    if (result.length === 0) {
      await pool.query(`INSERT INTO users (email, password) VALUES ($1, $2);`, 
        [email, password]);
      next()
    } else {
      res.status(403).send("Email already exists");
    }

  } catch (e) {
    console.log("ERror in sign up middleware:", e)
}
}


module.exports = {signup}