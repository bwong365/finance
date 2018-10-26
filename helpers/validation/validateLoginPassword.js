const bcrypt = require('bcryptjs');
const capitalize = require('../util/capitalize')

/**
 * Middleware
 * Query db to see if password matches username
 */
module.exports = async function verifyUser(req, res, next) {
  console.log(req.body);
  const { username, password } = req.body;
  const query = {
    text: 'SELECT pwhash FROM users WHERE username = $1',
    values: [capitalize(username)]
  }

  try {
    const dbData = await db.query(query);
    console.log(dbData);
    const hash = dbData.rows[0].pwhash
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