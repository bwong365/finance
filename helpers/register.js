const queryPG = require('./queryPG');

module.exports = function register(req, res) {
  const { user, name, hash } = req.body;
  const query = {
    text: 'INSERT INTO users (username, name, pwhash) VALUES ($1, $2, $3)',
    values: [user, name, hash]
  }

  // handle query promise
  queryPG(query)
    .then(dbData => {
      console.log(dbData);
      res.status(201);
      res.json({
        details: dbData
      });
      //res.redirect('/login');
    })
    .catch(err => {
      console.log(err)
      res.status(400);
      res.json(err.detail);
    });
}
