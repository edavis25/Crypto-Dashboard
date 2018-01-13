// A helper function for broadcasting ticker data over web sockets

const path = require('path');
const apiHelper = require(path.join(__rootdir, 'lib/cryptoCompare'));

exports.broadcastTickers = function(socket) {
    apiHelper.getTickers()
             .then(function(data) {
                 socket.emit('refresh_tickers', data);
                 return;
             })
             .catch(function(data) {
                 console.error("ERROR getting tickers from CryptoCompare API: ");
                 console.error(data);
                 socket.emit('refresh_tickers', data);
                 return;
             });
}
