const axios = require('axios');

module.exports = async function getQuote(req, res, next) {
  const url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=';
  const symbol = req.params.symbol;
  const apiKey = process.env.AV_API;
  const uri = url + symbol + '&apikey=' + apiKey;
  
  try {
    const quoteData = await axios(uri);
    const { '05. price': price, '09. change': change } = quoteData.data['Global Quote'];
    req.body.quote = {
      symbol,
      price,
      change
    }
  next();
  } catch (e) {
    res.send(e)
  }
  
  
  /*
    .then(quoteData => {
      
      
      next();
    })
    .catch(err => console.log(err));
    */
}