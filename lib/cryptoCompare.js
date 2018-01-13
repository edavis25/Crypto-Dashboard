// API helper for cryptocompare API

// This API caches ticker prices for 10 seconds so calling more often = superflous

const request = require('request-promise');
const baseUrl = 'https://min-api.cryptocompare.com/data/pricemultifull';

var api = {};

// Array of base currencies
api.fromPairs = [
    'BTC',      // Bitcoin
    'LTC',      // Litecoin
    'ETH',      // Ethereum
    'DOGE',     // Dogecoin
    'DASH',     // Dash
    'XRP',      // Ripple
    'BCH',      // Bitcoin Cash
    'XMR',      // Monero
    'XLM',      // Stellar
];

// Array of currencies traded against base
api.toPairs = [
    'BTC',
    'USD',
    'EUR'
];

// Format the url according to API expectations
api.formatUrl = function() {
    return baseUrl + "?fsyms=" + this.fromPairs.join() + "&tsyms=" + this.toPairs.join();
};

// Returns a promise object for the request
api.getTickers = function() {
    return request(this.formatUrl());
};

module.exports = api;
