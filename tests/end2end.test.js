const axios = require('axios');
const {createHttpTerminator} = require("http-terminator");

const {dbInit} = require("../src/dbInit");
const {pool} = require("../src/db");

const {app} = require("../src/index");
const server = app.listen();
const httpTerminator = createHttpTerminator({server});
const ENDPOINT = "http://localhost:" + server.address().port;
const SCHEMA = process.env.SCHEMA || "test";
beforeAll(async()=>{
  await dbInit();
})

afterAll(async ()=>{
  httpTerminator.terminate();
  await pool.query(`DROP SCHEMA IF EXISTS ${SCHEMA} CASCADE;`);
  await pool.end();
})


test("End to end", async ()=>{
  const token = (await axios.post(ENDPOINT + "/auth/signup", 
    {email:"test1@gmail.com", password:"password"},
    {headers:{
      "Content-Type":"application/json"
    }})).data.token;

  await axios.post(ENDPOINT + "/auth/logout",{}, {
    headers:{
      "Authorization":"Bearer " + token
    }
  })

  const token2 = (await axios.post(ENDPOINT + "/auth/login",
    {email:"test1@gmail.com", password:"password"},
    {headers:{
      "Content-Type":"application/json"
    }})).data.token;

  const itemId1 = (await axios.post(ENDPOINT + "/cart/add-item-entry",{
      itemCatalogId: 1,
      quantity: 2,
      sugar: 80,
      ice: 50,
      tapioca: 1,
      pudding: 0,
      grassjelly: 0,
    }, {
      headers: {
        "Authorization":"Bearer " + token2,
        "Content-Type":"application/json",
      }
    })).data.itemId

  await axios.put(ENDPOINT + "/cart/modify-item", {
    itemId: itemId1,
    quantity: 3,
    sugar: 60,
    ice: 50,
    tapioca: 1,
    pudding: 1,
    grassjelly: 0,
  }, {
    headers: {
      "Authorization":"Bearer " + token2,
      "Content-Type":"application/json",
    }
  })

  const itemId2 = (await axios.post(ENDPOINT + "/cart/add-item-entry",{
    itemCatalogId: 4,
    quantity: 1,
    sugar: 80,
    ice: 50,
    tapioca: 1,
    pudding: 1,
    grassjelly: 0,
  }, {
    headers: {
      "Authorization":"Bearer " + token2,
      "Content-Type":"application/json",
    }
  })).data.itemId

  await axios.delete(ENDPOINT + "/cart/remove-item", {
    headers: {
      "Authorization":"Bearer " + token2,
      "Content-Type":"application/json",
    },
    data: {
      itemId: itemId2
    }
  })

  const itemId3 = (await axios.post(ENDPOINT + "/cart/add-item-entry",{
    itemCatalogId: 3,
    quantity: 1,
    sugar: 80,
    ice: 50,
    tapioca: 1,
    pudding: 1,
    grassjelly: 0,
  }, {
    headers: {
      "Authorization":"Bearer " + token2,
      "Content-Type":"application/json",
    }
  })).data.itemId

  const cartItems = (await axios.get(ENDPOINT + "/cart/get-items", {
    headers: {
      "Authorization":"Bearer " + token2,
      "Content-Type":"application/json",
    }
  })).data

  expect(cartItems.length).toBe(2);
  expect(cartItems[0].itemId).toBe(itemId1);
  expect(cartItems[0].quantity).toBe(3);

  const orderId1 = (await axios.post(ENDPOINT + "/orders/place-order", {
    address:"1234 Meadowvale St",
    phone:"1231231233",
    name:"alvy"
  },{
    headers: {
      "Authorization":"Bearer " + token2,
      "Content-Type":"application/json",
    }
  })).data.orderId

  await axios.put(ENDPOINT + "/orders/pay", {
      orderId: orderId1, 
      paymentReference:"xbwUqed"
    }, {
    headers: {
      "Authorization":"Bearer " + token2,
      "Content-Type":"application/json",
    }})

  const orderId2 = (await axios.post(ENDPOINT + "/orders/place-order", {
    address:"1234 Meadowvale St",
    phone:"1231231233",
    name:"alvy"
  },{
    headers: {
      "Authorization":"Bearer " + token2,
      "Content-Type":"application/json",
    }
  })).data.orderId

  const orders = (await axios.get(ENDPOINT + "/orders/get-orders", {
    headers: {
      "Authorization":"Bearer " + token2,
      "Content-Type":"application/json",
    }
  })).data

  console.log(orders);
  console.log(orders[0].items)

})