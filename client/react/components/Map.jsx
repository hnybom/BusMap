'use strict';

var React = require('react');
var _ = require('lodash');

var vectorSource;

var createIcon = function(id, name, coords) {
    return new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform(coords, 'EPSG:4326',
            'EPSG:3857')),
        name: name,
        id: id
    });
};

var Map = React.createClass({
    displayName: 'Map',
    propTypes: {
        locations: React.PropTypes.array
    },
    // Render the component
    render: function(){
        return (
            <div><div id="map" className="map"></div><div id="popup"></div></div>
        )
    },
    componentWillReceiveProps: function(nextProps) {
        var features = vectorSource.getFeatures();
        vectorSource.clear();

        _.each(nextProps.locations, function(item) {
        /*    var match = _.find(features, function(f) {
                return f.B.id == item.journeyId;
            });
            if(match) {
                var geometry = match.getGeometry();
                var oldCoords = geometry.getCoordinates();
                var newX = item.x - oldCoords[0];
                var newY = item.y - oldCoords[1];
                if(newX != 0 && newY != 0) geometry.translate(newX, newY);
            } else {*/
                var icon = createIcon(item.journeyId, item.lCode, [item.x, item.y]);
                vectorSource.addFeature(icon);
            //}
        });
/*
        _.each(features, function(f) {
            var match = _.find(nextProps.locations, function(item) {
                return f.B.id == item.journeyId;
            });
            if(!match) {
                vectorSource.removeFeature(f);
            }
        });
        */

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

        vectorSource = new ol.source.Vector();

        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 1,
                scale: 0.19,
                src: 'images/school25.png'
            }))
        });

        var vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            style: iconStyle
        });

        map.addLayer(vectorLayer);

        var popupEl = document.getElementById('popup');

        $(popupEl).popover({
            'placement': 'top',
            'html': true
        });

        var popup = new ol.Overlay({
            element: popupEl,
            positioning: 'bottom-center',
            stopEvent: false
        });
        map.addOverlay(popup);

        // display popup on click
        map.on('click', function(evt) {
            var feature = map.forEachFeatureAtPixel(evt.pixel,
                function(feature, layer) {
                    return feature;
                });
            if (feature) {
                var geometry = feature.getGeometry();
                var coord = geometry.getCoordinates();
                popup.setPosition(coord);
                $(popupEl).attr('data-content', feature.get('name'));
                $(popupEl).popover('show');
            } else {
                $(popupEl).popover('hide');
            }

        });
    }
});

module.exports = Map;
