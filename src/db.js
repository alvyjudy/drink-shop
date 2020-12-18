const {Pool} = require("pg");

const pool = new Pool({
  user: process.env.PGUSER || "dev",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "local",
  password: process.env.PGPASSWORD || "localdev",
  port: process.env.PGPORT || 5432
});

module.exports = {pool: {
  query: (text, params) => {
    //console.log(text);
    return pool.query(text, params).then(res=>{
      //console.log(res.rows)
      return res
    }).catch(e=>{
      console.log("SQL query error", e)
      return e;
    });
  },
  connect: () => {
    return pool.connect();
  }
}};