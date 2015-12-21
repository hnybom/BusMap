/**
 * Created by hnybom on 5.12.2015.
 */
/*
lCode: "1C",
    direction: 1,
    x: 23.8981525,
    y: 61.4949857,
    bearing: 303,
    prevStop: "5145",
    currStop: "4563",
    journeyId: "f1f08811c9c56ec6e391249000000004",
    deptTime: "1800",
    busIconUrl: null
    */
var mongoose = require('mongoose');
var _ = require('lodash');

// Create a new schema for our tweet data
var schema = new mongoose.Schema({
    lCode      : String,
    direction  : Number,
    x          : Number,
    y          : Number,
    bearing    : Number,
    prevStop   : String,
    currStop   : String,
    journeyId  : String,
    deptTime   : String,
    busIconUrl : String,
    timestamp  : Number
});

schema.statics.saveLocations = function(data, callback) {
    BusLocation.findLatestLocation(function(result) {
        var now = Date.now();
        if(!result || ((now - result.timestamp) > 60000)) {
            var db = mongoose.connection;
            var withTs = _.map(data, function(item) {return _.assign(item, {timestamp: now})});
            db.collection('buslocations').insert(withTs);
            callback(true);
        } else {
            callback(false);
        }
    });

};

schema.statics.findLatestLocation = function(callback) {
    BusLocation.find({}).sort({timestamp: 'desc'}).limit(1).lean().exec(function(err, docs){
        if(!err) {
            callback(docs[0]);
        } else {
            callback(undefined);
        }
    });
};

schema.statics.findAllLocations = function(before, callback) {
    BusLocation.find({timestamp: {$lte: before}}).sort({timestamp: 'desc'}).lean().exec(function(err, docs){
        if(!err) {
            callback(docs);
        } else {
            callback([]);
        }
    });
}

module.exports = BusLocation = mongoose.model('buslocations', schema);