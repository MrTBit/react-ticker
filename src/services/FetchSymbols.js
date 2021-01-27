import SymbolModel from "../models/SymbolModel";
const axios = require('axios');

const stocksUrl = 'https://finnhub.io/api/v1/stock/symbol?exchange=US&token=' + process.env.REACT_APP_API_KEY;
const cryptoUrl = 'https://finnhub.io/api/v1/crypto/symbol?exchange=binance&token=' + process.env.REACT_APP_API_KEY;

const getAllSymbols = () => getStockSymbols().then(results => getCryptoSymbols().then(cryptoResults => results.concat(cryptoResults)));

const getStockSymbols = () => axios.get(stocksUrl).then(response => response.data.map(apiObject => new SymbolModel(apiObject.description, apiObject.symbol)));

const getCryptoSymbols = () => axios.get(cryptoUrl).then(response => response.data.map(apiObject => new SymbolModel(apiObject.description, apiObject.symbol)));

export default getAllSymbols;