const express = require('express')
const app = express()
const cors = require('cors');
const port = 3000
const axios = require('axios')
const formatter = require('./formatter');

app.use(cors());
app.options('*', cors());
app.get('/data', async (req, res) => {
  const market = req.query.market;
  const pageSize = req.query.pageSize;
  let result;
  switch(market){
    case 'bitfinex':
      result = await axios.get('https://api-pub.bitfinex.com/v2/ticker/tETHBTC');
      result = formatter.formatBitfinex(result.data,pageSize);
      break;
    case 'binance':
      result = await axios.get('https://api.binance.com/api/v3/ticker/bookTicker?symbol=ETHBTC');
      result = formatter.formatBinance(result.data,pageSize);
      break;    
  }
  res.send(result);
})

app.get('/binance', async (req,res)=>{
    res.send('Hello World from Biance');
})

app.get('/bittrex', async (req,res)=>{
    res.send('Hello World from Bittrex');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})