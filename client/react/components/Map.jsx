'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Map = React.createClass({
    propTypes: {
        locations: React.PropTypes.array
    },
    // Render the component
    render: function(){
        return (
            <div id="map" className="map"></div>
        )
    },
    componentDidMount: function() {

        var tampere = ol.proj.fromLonLat([23.766331, 61.497452]);

        var view = new ol.View({
            // the view's initial state
            center: tampere,
            zoom: 12
        });

        var map = new ol.Map({
            layers: [
                new ol.layer.Tile({
                    preload: 4,
                    source: new ol.source.OSM()
                })
            ],
            // Improve user experience by loading tiles while animating. Will make
            // animations stutter on mobile or slow devices.
            loadTilesWhileAnimating: true,
            target: 'map',
            controls: ol.control.defaults({
                attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                    collapsible: false
                })
            }),
            view: view
        });
    }
});

module.exports = Map;
