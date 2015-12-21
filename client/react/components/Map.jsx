'use strict';

var React = require('react');
var _ = require('lodash');

var vectorSource;

var createIcon = function(item) {
    var id = item.journeyId,
        name = item.lCode,
        coords = [item.x, item.y];

    return new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform(coords, 'EPSG:4326',
            'EPSG:3857')),
        name: name,
        currStop: item.currStop,
        prevStop: item.prevStop,
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
            <div id="map" className="map"><div id="popup"></div><div id="curStopPopup"></div></div>
        )
    },
    componentWillReceiveProps: function(nextProps) {
        vectorSource.clear();
        _.each(nextProps.locations, function(item) {
            var icon = createIcon(item);
            vectorSource.addFeature(icon);
        });

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
        var stopPopupEl = document.getElementById('curStopPopup');

        $(popupEl).popover({
            'placement': 'top',
            'html': true
        });

        $(stopPopupEl).popover({
            'placement': 'bottom',
            'html': true
        });

        var popup = new ol.Overlay({
            element: popupEl,
            positioning: 'bottom-center',
            stopEvent: false
        });

        var stopPopup = new ol.Overlay({
            element: stopPopupEl,
            positioning: 'bottom-center',
            stopEvent: false
        });

        map.addOverlay(popup);
        map.addOverlay(stopPopup);

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
                $.getJSON('/rest/gtfs/stop/' + feature.get('currStop'), function(data) {
                    var stopData = data[0];
                    if(stopData) {
                        stopPopup.setPosition(ol.proj.transform(stopData.loc, 'EPSG:4326',
                            'EPSG:3857'));
                        $(stopPopupEl).attr('data-content', 'Seuraava pysäkki: ' + stopData.stop_name);
                        $(stopPopupEl).popover('show');
                    } else {
                        $(stopPopupEl).popover('hide');
                    }
                });
            } else {
                $(popupEl).popover('hide');
                $(stopPopupEl).popover('hide');
            }

        });
    }
});

module.exports = Map;
