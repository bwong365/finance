// Dependencies
require('dotenv').config();
const express   = require('express');
const jwt       = require('jsonwebtoken');
const path      = require('path');
const { Pool }  = require('pg');

const auth      = require('./auth');
const stock     = require('./stock');

const app       = express();
const port      = process.env.PORT || 5000;

global.db = global.db ? global.db : new Pool({
  //user: process.env.PGUSER,
  //host: process.env.PGHOST,
  //database: process.env.PGDATABASE,
  //password: process.env.PGPASS,
  //port: process.env.PGPORT,
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

// Parse requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'view/build')));
app.route('*').get((_, res) => {
  res.sendFile(path.join(__dirname + 'view/build/index.html'));
});

// Routing
app.use(auth);
app.use(stock);



// Listen!
app.listen(port, () => console.log(`Listening on port: ${port}`));
