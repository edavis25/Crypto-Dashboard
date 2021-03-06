const mongoose = require('mongoose');

var ProfileSchema = new mongoose.Schema({
  email: String,
  //tickers: [String],
  tickers: [{
     from: String,
     to: String 
  }],
  exchanges: [String],
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Profile', ProfileSchema);
