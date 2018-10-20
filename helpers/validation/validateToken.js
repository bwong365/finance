const jwt = require('jsonwebtoken');
const dbQuery = require('../queryPG');

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
    res.status(403);  // You shall not pass
    res.redirect('/login');
    return;
  }

  // Extract token from format: Bearer <token>
  const token = value.split(' ')[1];

  // Abort if the token cannot be decoded
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.status(403);
      res.redirect('/login');
      return
    }
    
    // Find whether the decoded user exists in the database
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [decoded.user]
    }

    dbQuery(query)
      .then(dbData => {
        // For the rare chance a user was deleted but token was left over
        if (dbData.rows.length === 0) {
          res.status(403);
          res.redirect('/login');
        }
        
        // Set the request user to the user
        req.user = decoded.user;
        next();
      })

      // Errors
      .catch(err => {
        console.log(err);
        res.status(403);
        res.redirect('/login');
      })
    
  });
}