const jwt = require("jsonwebtoken");

const {db} = require("./db")

const login = () => (req, res, next) => {
  const {email, password} = req.body;
  if (!db.doesEmailExist(email)) {
    res.status(403).send("Email does not exists.");
    return undefined;
  } 
  
  if (!db.doesPasswordMatch(email, password)) {
    res.status(403).send("Password incorrect");
    return undefined;
  }

  const token = jwt.sign({email}, "temporarySecret");
  db.loginUser(email, token);
  req.jwtToken = token;
  next();
}

module.exports = {login}