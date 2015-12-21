/**
 * Created by hnybom on 8.12.2015.
 */

var schedule = require('node-schedule');
var BusLocations = require('../models/BusLocation');
var gtfs = require('gtfs');
var moment = require('moment');
var _ = require('lodash');

// every noon '0 0 12 1/1 * ? *'

console.log('Data analyzer');

var j = schedule.scheduleJob('*/1 * * * *', function(){

    var now = Date.now();
    var collectedResults = {};

    console.log('Schedule');

    var processResults = function() {
        console.log('process');
    };

    BusLocations.findAllLocations(now, function(results) {
        var promises1 = [];

        _.forEach(results, function(busLocation) {
            promises1.push(new Promise(function(resolve, reject) {

                gtfs.getStopsByDistance(busLocation.y, busLocation.x, 0.1, function (err, stops) {
                    var promises2 = [];
                    _.forEach(stops, function (stop) {
                        promises2.push(new Promise(function (resolve, reject) {
                            gtfs.getStoptimesByStop('tampere', busLocation.lCode, stop.stop_id, busLocation.direction, function (err, stoptimes) {

                                console.log('stoptimes: ' + stoptimes);

                                if (!collectedResults[stop.stop_id]) {
                                    collectedResults[stop.stop_id] = [];
                                }

                                var arrivalTime = moment(stoptimes.arrival_time, "HH-mm-ss");
                                var scheduleTime = arrivalTime.unix();

                                collectedResults[stop.stop_id].push({
                                    busTime: busLocation.timestamp,
                                    scheduleTime: scheduleTime,
                                    delta: (scheduleTime - busLocation.timestamp),
                                    direction: busLocation.direction,
                                    lCode: busLocation.lCode
                                });

                                console.log('collectedResults added');
                                resolve();

                            });
                        }));
                    });
                    Promise.all(promises2).then(function() {resolve()});
                    resolve();
                });
            }));

        });

        Promise.all(promises1).then(processResults);

    });



});
