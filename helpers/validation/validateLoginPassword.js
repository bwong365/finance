const bcrypt = require('bcryptjs');
const db = require('../queryPG');

/**
 * Middleware
 * Query db to see if password matches username
 */
module.exports = async function verifyUser(req, res, next) {
  
  const { user, password } = req.body;
  const query = {
    text: 'SELECT pwhash FROM users WHERE username = $1',
    values: [user]
  }
  
  try {
    const dbData = await db(query);
    const hash = dbData.rows[0].pwhash
    console.log(password);
    const valid = await bcrypt.compare(password, hash);
    if (valid) {
      next();
    } else {
      res.sendStatus(401);
    }
    
  } catch (e) {
    console.log(e);
    res.json(e);
  }
}