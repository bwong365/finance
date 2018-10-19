const router = require('express').Router();

const getQuote   = require('./helpers/getQuote');
const hashpw     = require('./helpers/hashpw');
const register   = require('./helpers/register');
const sendQuote  = require('./helpers/sendQuote');
const signToken  = require('./helpers/signToken');
const verifyUser = require('./helpers/verifyUser');


router.route('/').get((_, res) => {
  res.json({message: 'Welcome to finance!'});
})

router.route('/register').post(hashpw, register);
router.route('/login').post(verifyUser, signToken);
// change password
router.route('/quote/:symbol').get(getQuote, sendQuote);
// buy stocks
// get stock quotes
// sell stocks
module.exports = router;