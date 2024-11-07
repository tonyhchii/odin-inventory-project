const { Pool } = require("pg");

module.exports = new Pool({
  connectionString: process.env.NEON_DATABASE_CONNECTION_STRING,
});
