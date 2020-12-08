function Db() {

  this.users = new Map();
  this.cart = new Map(); //[[<id>, <count>], [<id>, <count>]]
  this.loggedIn = new Map();

  this.doesEmailExist = (email) => {
    return this.users.has(email)
  }

  this.addUser = (email, password) => {
    this.users.set(email.toString(), password.toString());
    this.cart.set(email, new Map())
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


  this.getItems = (email) => {
    return Array.from(this.cart.get(email))
  }
 
  this.addMinusItem = (item, email) => { //can be used to minus item count as well
    const cart = this.cart.get(email);
    if (cart.has(item[0])) {
      const oldcount = cart.get(item[0]);
      cart.set(item[0], Math.max(1, oldcount + item[1]))
    } else {
      cart.set(item[0], Math.max(1, item[1]))
    }

  }

  this.removeItem = (itemId, email) => {
    const cart = this.cart.get(email);
    cart.delete(itemId)
  }

}

const db = new Db();

module.exports = {db};

