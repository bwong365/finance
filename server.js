// Dependencies
require('dotenv').config();
const express   = require('express');
const jwt       = require('jsonwebtoken');

const auth      = require('./auth');
const protected = require('./protected');

const app       = express();
const port      = process.env.PORT;

// Parse requests
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routing
app.use(auth);
app.use(protected);

// Listen!
app.listen(port, () => console.log(`Listening on port: ${port}`));
