const jwt = require('jsonwebtoken');

/**
 * Sign a token, assume the user has already
 * been verified by middleware
 */
module.exports = function login(req, res) {
  const { username } = req.body;
  const secret = process.env.JWT_SECRET_OR_KEY;

  // Sign and send the token
  jwt.sign({ username }, secret, { expiresIn: '7d' }, (err, token) => {
    if (err) {
      console.log(err);
      res.json(err);
      return;
    } else {
      res.json({ token, username });
    }
  });

}