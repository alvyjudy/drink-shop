const {Pool} = require("pg");

const pool = new Pool({
  user: process.env.PGUSER || "dev",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "local",
  password: process.env.PGPASSWORD || "localdev",
  port: process.env.PGPORT || 5432
});

module.exports = {pool};