/*******************************
 | Proxy request to CoinmarketCap API
 | to avoid CORS errors in Angular
 *******************************/
const express = require('express');
const router = express.Router();
const path = require('path');
const request = require('request');

// Get all tickers
router.get('/', function(req, res, next) {
    request({
        uri: 'https://api.coinmarketcap.com/v1/ticker/',
    }).pipe(res);
});

// Get profile data
router.get('/:pairs', function(req, res, next) {
    console.log(req.params.pairs);
});

module.exports = router;
