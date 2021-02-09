const {Pool} = require("pg");

const connectionConfig = (
  process.env.ENV === "production" || 
  process.env.ENV === "staging"
  ) ? 
  {connectionString: process.env.DATABASE_URL} :
  {
    user: "dev",
    host: "localhost",
    database: "local",
    password: "localdev",
    port: 5432
  };

const pool = new Pool(
  connectionConfig
  );

module.exports = {pool: {
  query: (text, params) => {
    //console.log(text);
    return pool.query(text, params).then(res=>{
      //console.log(res.rows)
      return res
    }).catch(e=>{
      console.log("SQL query error for statement", text,"\n", e)
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