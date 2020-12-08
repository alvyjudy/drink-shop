const jwt = require("jsonwebtoken");

const {db} = require("../db");

const logout = () => (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1]
  const email = jwt.decode(token, "temporarySecret")
  db.logOutUser(email)
  next()
}

module.exports = {logout}