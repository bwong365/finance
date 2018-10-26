// Dependencies
require('dotenv').config();

const express  = require('express');
const path     = require('path');
const { Pool } = require('pg');

const auth  = require('./auth');
const stock = require('./stock');

const app  = express();
const port = process.env.PORT || 5000;

// Database config for development
const dev = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASS,
  port: process.env.PGPORT,
};

// Database config for Heroku
const heroku = {
  connectionString: process.env.DATABASE_URL,
  ssl: true,
};

// Auto switch between development and production
global.db = global.db ? global.db : new Pool(process.env.PGHOST ? dev : heroku);

// Parse requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Redirect '/' to React app
app.use(express.static(path.join(__dirname, 'view/build')));
app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname + 'view/build/index.html'));
});

// Routing
app.use(auth);
app.use(stock);

// Listen!
app.listen(port, () => console.log(`Listening on port: ${port}`));
