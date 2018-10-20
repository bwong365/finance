const axios = require('axios');

/**
 * Middleware
 * Attach a quote: {symbol, price, change} to the request as req.quote
 */
module.exports = async function getQuote(req, res, next) {
  // Stocks from Alpha Vantage
  const url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=';

  const symbol = req.params.symbol || req.body.symbol;
  const apiKey = process.env.AV_API;
  const uri = url + symbol + '&apikey=' + apiKey;
  
  try {
    const quoteData = await axios(uri);
    // Extract the price and change from the response data
    const { '05. price': price, '09. change': change } = quoteData.data['Global Quote'];
    
    // Modify the request body with a quote containing the symbol, price, and deltaPrice
    req.quote = {
      symbol,
      price,
      change
    }

    // Call the next function
    next();

    // Error handling
  } catch (e) {
    res.send(e)
  } 
}