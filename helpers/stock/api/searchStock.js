// get /search:keyword
const axios = require('axios');

module.exports = async function searchStock(req, res, next) {
  const { keywords } = req.query;
  const apiKey = process.env.AV_API
  const url = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords='

  const uri = url + keywords + '&apikey=' + apiKey;
  console.log(apiKey);
  try {
    const searchResults = await axios(uri);
    const topResult = searchResults.data.bestMatches[0];
    if (topResult == undefined) return res.sendStatus(404);
    req.topResult = topResult;
    
    req.body.symbol = topResult['1. symbol']
    next();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}