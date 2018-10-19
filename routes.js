const router   = require('express').Router();
const hashpw   = require('./helpers/hashpw');
const register = require('./helpers/register');
const verifyUser = require('./helpers/verifyUser');
const signToken = require('./helpers/signToken');


router.route('/').get((_, res) => {
  res.json({message: 'Welcome to finance!'});
})

router.route('/register').post(hashpw, register);
router.route('/login').post(verifyUser, signToken);

module.exports = router;