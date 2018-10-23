const axios = require('axios');

module.exports = async function processShares(req, res) {
  const { allShares } = req;

  try {
    const promises = Object.keys(allShares)
      .filter(symbol => allShares[symbol].amount > 0)
      .map(async symbol => {
        const amount = allShares[symbol].amount;
        const price = await aV(symbol);
        return ({ symbol, price, amount })
      });

    const sharesArray = await Promise.all(promises);
    console.log(sharesArray);
    return res.json(sharesArray);    
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

// Get prices for share symbol
async function aV(symbol) {
  try {
    const url    = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=';
    const apiKey = process.env.AV_API;
    const uri    = url + symbol + '&apikey=' + apiKey;

    const quoteData = await axios(uri);

    const { '05. price': price } = quoteData.data['Global Quote'];  

    return price;  
  } catch (e) {
    console.log(e);
  }
  
}