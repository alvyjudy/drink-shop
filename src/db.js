function Db() {
  console.log('initialize fake database');
  this.users = new Map();
  this.loggedIn = new Map();

  this.doesEmailExist = (email) => {
    return this.users.has(email)
  }

  this.addUser = (email, password) => {
    this.users.set(email.toString(), password.toString());
  }

  this.doesPasswordMatch = (email, password) => {
    return this.users.get(email) === password.toString();
  }

  this.loginUser = (email, token) => {
    this.loggedIn.set(email, token)
  }

  this.isUserLoggedIn = (email) => {
    return this.loggedIn.has(email);
  }

  this.logOutUser = (email) => {
    this.loggedIn.delete(email)
  }
}

const db = new Db();

module.exports = {db};

