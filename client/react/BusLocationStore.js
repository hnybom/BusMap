/**
 * Created by hnybom on 29.11.2015.
 */
'use strict';
var Reflux = require('reflux');
var _ = require('lodash');
var io = require('socket.io-client');
var BusActions = require('./BusLocationActions.js');

var BusStore = Reflux.createStore({
    listenables: [BusActions],
    init: function () {
        this.listenToData();
    },
    getInitialState: function () {
        this.locations = [];
        return this.locations;
    },
    listenToData: function() {
        var self = this;
        var socket = io.connect();
        socket.on('buslocations', function(data) {
            console.log(data);
            self.updateLocations(data);
        });
    },
    updateLocations: function(locs) {
        this.locations = locs;
        this.trigger(this.locations);
    }
});

module.exports = BusStore;