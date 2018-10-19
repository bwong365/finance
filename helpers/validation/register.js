const dbQuery = require('../queryPG');

module.exports = function register(req, res) {
  // Extract variables from req.body and build the query
  const { user, name, hash } = req.body;
  const query = {
    text: 'INSERT INTO users (username, name, pwhash) VALUES ($1, $2, $3)',
    values: [user, name, hash]
  }

  // Insert the users into the database
  dbQuery(query)
    .then(dbData => {
      console.log(dbData);
      // Return status code Created
      res.status(201);
      res.json({
        details: dbData
      });
      //res.redirect('/login');
    })
    // Handle errors
    .catch(err => {
      console.log(err)
      res.status(400);
      res.json(err.detail);
    });
}
