'use strict';

var React = require('react');
var Map = require('./Map.jsx');

var BusMapApp = React.createClass({
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
