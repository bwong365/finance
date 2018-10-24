const jwt = require('jsonwebtoken');

/**
 * Middleware
 * Verify request token and attach username
 * from the token to the request as req.user
 */
module.exports = function requireToken(req, res, next) {
  // Get token from bearerHeader
  const secret = process.env.JWT_SECRET_OR_KEY
  const value = req.headers.authorization;

  // Abort if the token is of an invalid format or does not exist
  if (typeof value === 'undefined') {
    console.log('token missing');
    return res.sendStatus(403);  // You shall not pass
  }

  // Extract token from format: Bearer <token>
  const token = value.split(' ')[1];

  // Abort if the token cannot be decoded
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    console.log(decoded);
    // Find whether the decoded user exists in the database
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [decoded.username]
    }

    db.query(query)
      .then(dbData => {

        // For the rare chance a user was deleted but token was left over
        if (dbData.rows.length === 0) {
          console.log('no data');
          return res.sendStatus(403);
        }

        // Set the request user to the user
        req.username = decoded.username;
        next();
      })

      // Errors
      .catch(err => {
        console.log(err);
        return res.sendStatus(403);
      });

  });
}