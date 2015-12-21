/**
 * Created by hnybom on 8.12.2015.
 */
var mongoose = require('mongoose');
var _ = require('lodash');

// Create a new schema for our tweet data
var schema = new mongoose.Schema({
    lCode           : String,
    direction       : Number,
    stopCode        : String,
    busTime         : Number, // Average
    scheduleTime    : Number, // Average
    delta           : Number  // Average
});

