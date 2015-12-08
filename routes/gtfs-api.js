/**
 * Created by hnybom on 3.12.2015.
 */
var express = require('express');
var gtfs = require('gtfs');
var router = express.Router();

/* GET home page. */
router.get('/stop/:id', function(req, res, next) {
    var stopId = req.params.id;
    gtfs.getStops('tampere', stopId, function(err, stops) {
        res.send(stops);
    });
});

module.exports = router;
