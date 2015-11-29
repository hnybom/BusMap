'use strict';

var React = require('react');
var Reflux = require('reflux');
var Map = require('./Map.jsx');
var BusLocationStore = require('../BusLocationStore');

var BusMapApp = React.createClass({
    mixins: [Reflux.connect(BusLocationStore, "locations")],
    // Render the component
    render: function(){
        return (
            <div className="busmap-app">
                <Map />
            </div>
        )
    }
});

module.exports = BusMapApp;
