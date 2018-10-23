const db = require('../util/queryPG.js');

/**
 * Registers users into the database
 */
module.exports = function register(req, res, next) {
  // Extract variables from req.body and build the query
  const { username, hash } = req.body;
  const query = {
    text: 'INSERT INTO users (username, pwhash) VALUES ($1, $2)',
    values: [username, hash]
  }

  // Insert the users into the database
  db(query)
    .then(dbData => {
      console.log(dbData);
      // Return status code Created
      res.status(201);
      next();
    })
    // Handle errors
    .catch(err => {
      console.log(err)
      res.status(409).json({ error: err.detail });
    });
}
