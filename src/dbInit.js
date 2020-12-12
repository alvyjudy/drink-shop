const {pool} = require("./db");

const SCHEMA = process.env.SCHEMA || "dev";
const dbInit = async () => {
  await pool.query(`DROP SCHEMA IF EXISTS ${SCHEMA} CASCADE;`);
  await pool.query(`CREATE SCHEMA ${SCHEMA};`);
  await pool.query(`SET search_path TO ${SCHEMA};`);

  await pool.query(`SHOW search_path;`).then(res=>{console.log(res.rows)})

  await pool.query(`CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  );`)

  await pool.query(`CREATE TABLE IF NOT EXISTS session (
    token TEXT NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
  );`)

  await pool.query(`CREATE TABLE IF NOT EXISTS cart (
    item_id serial PRIMARY KEY,
    item_catalog_id INT,
    quantity INT, 
    sugar INT,
    ice INT,
    tapioca INT,
    pudding INT,
    grassjelly INT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE
  );`)

  await pool.query(`CREATE TABLE IF NOT EXISTS orders (
    order_id serial PRIMARY KEY,
    address TEXT,
    phone TEXT,
    name TEXT,
    payment_reference TEXT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE
  );`)

  await pool.query(`CREATE TABLE IF NOT EXISTS ordered_items (
    item_id INT,
    item_catalog_id INT,
    quantity INT, 
    sugar INT,
    ice INT,
    tapioca INT,
    pudding INT,
    grassjelly INT,
    order_id INT,
    FOREIGN KEY (order_id) REFERENCES users(user_id)
    ON DELETE CASCADE
  );`)
}

module.exports = {dbInit}
if (require.main === module) {
  dbInit().then(res=>{
    pool.end();
  });
}