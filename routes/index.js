/*******************************
 | Route for dashboard
 *******************************/
const express = require('express');
const router = express.Router();
const path = require('path');

const public = path.join(__rootdir, 'public');

// Get homepage
router.get('/', function(req, res, next) {
  res.sendFile(path.join(public, 'index.html'));
});

module.exports = router;
