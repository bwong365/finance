const capitalize = require('../util/capitalize');
const jwt        = require('jsonwebtoken');

/**
 * Sign a token, assume the user has already
 * been verified by middleware
 */
module.exports = function login(req, res) {
  const { username } = req.body;
  const secret = process.env.JWT_SECRET_OR_KEY;

  // Sign and send the token
  jwt.sign({ username: capitalize(username) }, secret, { expiresIn: '7d' }, (err, token) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      res.json({ token, username: capitalize(username) });
    }
  });

}