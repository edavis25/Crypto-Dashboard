/*******************************
 | Proxy request to Cryptocompare API coin details
 | to avoid CORS errors in Angular
 *******************************/
const express = require('express');
const router = express.Router();
const path = require('path');
const request = require('request');
const apicache = require('apicache');
const apiUrl = 'https://min-api.cryptocompare.com/data/all/coinlist';

// Get all tickers
let cache = apicache.middleware;
router.get('/', cache('60 minutes'), function(req, res, next) {
    request({
        uri: apiUrl,
    }).pipe(res);
});

module.exports = router;
