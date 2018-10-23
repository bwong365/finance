// Dependencies
require('dotenv').config();
const express   = require('express');
const jwt       = require('jsonwebtoken');
const path      = require('path');

const auth      = require('./auth');
const stock     = require('./stock');

const app       = express();
const port      = process.env.PORT;

// Parse requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'view/build')));
app.get((_, res) => {
  res.sendFile(path.join(__dirname + 'view/build/index.html'));
});



// Routing
app.use(auth);
app.use(stock);



// Listen!
app.listen(port, () => console.log(`Listening on port: ${port}`));
