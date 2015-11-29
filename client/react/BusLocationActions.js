/**
 * Created by hnybom on 29.11.2015.
 */
'use strict';
var Reflux = require('reflux');

var BusActions = Reflux.createActions([
    "locationUpdate" // When bus locations are updated
]);

module.exports = BusActions;