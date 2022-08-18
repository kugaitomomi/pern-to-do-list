const Pool = require("pg").Pool;

const pool = new Pool({
  user: "tomomi",
  password: "kanesima",
  host: "localhost",
  port: 5432,
  database: "perntodo"
});

module.exports = pool;