/*******************************
 | Routes for profile data stored
 | in local database
 *******************************/
const express = require('express');
const router = express.Router();
const path = require('path');

// Profile model
var Profile = require(path.join(__rootdir, 'models', 'Profile.js'));

// NOTE: Remove this bad boy after testing and such
router.get('/', function(req, res, next) {
    Profile.find(function(err, profiles) {
        if (err) {
            return next(err);
        }
        res.json(profiles);
    });
});

// Get profile data
router.get('/:id', function(req, res, next) {
    Profile.findById(req.params.id, function(err, profile) {
        if (err) {
            return next(err);
        }
        res.json(profile);
    });
});

// Create new profile
router.post('/', function(req, res, next) {
    // NOTE: Make sure to set content type for application/json!
    Profile.create(req.body, function (err, profile) {
        if (err) {
            return next(err);
        }
        console.log(req.body);
        res.json(profile)
    });
});

module.exports = router;
