const jwt = require("jsonwebtoken");

const {db} = require('../db');

const checkLogin = () => (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1]
  
  const {email} = jwt.decode(token, "temporarySecret")

  if (db.isUserLoggedIn(email)) {
    req.email = email
    next()
  } else {
    res.status(403).send("User not logged in.")
  }
}

module.exports = {checkLogin}