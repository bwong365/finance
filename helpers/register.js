require('dotenv').config({ path: '../'});
const { Pool } = require('pg');
const db = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASS,
  port: process.env.PGPORT
});

module.exports = async function register(req, res) {
  console.log('gothere');
  await db.connect();
  const { user, name, hash } = req.body;
  const query = {
    text: 'INSERT INTO users (username, name, pwhash) VALUES ($1, $2, $3)',
    values: [user, name, hash]
  }
  db.query(query, (err, data) => {
    if (err) {
      res.json({
        error: err.detail
      });
      res.end();
    } else {
      res.sendStatus(201);
      res.end();
    }
  })
}