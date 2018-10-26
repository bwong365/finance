const axios = require('axios');

/**
 * Middleware
 * Calls AlphaVantage to search for stock information based on
 * partial or complete keywords, and attaches the top match
 * to the request.
 */
module.exports = async function searchStock(req, res, next) {
  const { keywords } = req.query;
  const apiKey = process.env.AV_API;
  const url = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords='
  const query = url + keywords + '&apikey=' + apiKey;
  
  try {
    // Call AlphaVantage
    const searchResults = await axios(query);

    // If there are no results return 404, otherwise attach top result to request
    const topResult = searchResults.data.bestMatches[0];
    if (topResult == undefined) return res.sendStatus(404);
    req.topResult = topResult;
    
    // Attach the symbol to the request body for the getQuote middleware
    req.body.symbol = topResult['1. symbol'];
    next();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}