const jwt = require("jsonwebtoken");

const {pool} = require("../db")

const login = () => async (req, res, next) => {
  try {
    const {email, password} = req.body;

    const result = (await pool.query(`SELECT user_id FROM users WHERE 
      email = $1 AND password = $2;`, [email, password])).rows

    if (result.length !== 0) {
      const {user_id: userId} = result[0];
      const token = jwt.sign({userId}, "temporarySecret");
      await pool.query(`INSERT INTO session (token, user_id)
        VALUES ($1, $2);`, [token, userId]);
      req.token = token;
      next()
    } else {
      res.status(400).send("Invalid credential");
    }
  } catch(e) {
    console.log("Error in login middleware", e);
  }
}

module.exports = {login}