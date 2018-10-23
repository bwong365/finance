const { Pool } = require('pg');

/**
 * Use a pool of clients to query a postgresql db
 * @returns Promise containing the rows of data
 */
module.exports = async function queryPG(query) {
  const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  })
  // Creates a dynamic pool of clients for postgres
  /*
  const db = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASS,
    port: process.env.PGPORT
  });*/

  // thanks, async (and Rob for teaching me async)
  await db.connect();
  return db.query(query);
}
