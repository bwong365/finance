const bcrypt     = require('bcryptjs');
const capitalize = require('../util/capitalize');

/**
 * Middleware
 * Query db to check if password matches username
 */
module.exports = async function verifyUser(req, res, next) {
  const { username, password } = req.body;
  const query = {
    text: 'SELECT pwhash FROM users WHERE username = $1',
    values: [capitalize(username)]
  };

  try {
    // Get stored hash from database
    const dbData = await db.query(query);
    const hash = dbData.rows[0].pwhash;

    // Check for match between password and hash
    const valid = await bcrypt.compare(password, hash);
    if (valid) {
      next();
    } else {
      res.sendStatus(401);
    }

  } catch (e) {
    console.log(e);
    res.status(403).json(e);
  }
}