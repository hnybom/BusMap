'use strict';

var React = require('react');
var _ = require('lodash');

var vectorLayer;
var iconFeatures=[];

var createIcon = function(name, coords) {
    return new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform(coords, 'EPSG:4326',
            'EPSG:3857')),
        name: name
    });
};

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
    componentWillReceiveProps: function(nextProps) {
        console.log(nextProps.locations); // TODO: why no props :(
    },
    componentDidMount: function() {

        var tampere = ol.proj.fromLonLat([23.766331, 61.497452]);

        var view = new ol.View({
            // the view's initial state
            center: tampere,
            zoom: 12
        });

        var iconFeature1 = createIcon("Bus", [23.766331, 61.497452]);
        iconFeatures.push(iconFeature1);

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

        var vectorSource = new ol.source.Vector({
            features: iconFeatures //add an array of features
        });

        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 1,
                scale: 0.07,
                src: 'images/bus-stop.svg'
            }))
        });

        vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            style: iconStyle
        });

        map.addLayer(vectorLayer);
    }
});

module.exports = Map;
