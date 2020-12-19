const {Pool} = require("pg");
console.log("ENV variables:", process.env)

const pool = new Pool(
  process.env.ENV === "production" ? 
  {connectionString: process.env.DATABASSE_URL} :
  {user: "dev",
    host: "localhost",
    database: "local",
    password: "localdev",
    port: 5432}
  );

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
  end:()=>{
    return pool.end()
  },
  connect: () => {
    return pool.connect();
  }
}};