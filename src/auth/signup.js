const jwt = require("jsonwebtoken");

const {db} = require("../db");

const signup = () => (req, res, next) => {
  const {email, password} = req.body;

  //check email duplicate
  if (db.doesEmailExist(email)) {
    res.status(403).send("Email already exists");
    return undefined
  } else {
    db.addUser(email, password);
    next()
  }

}


module.exports = {signup}