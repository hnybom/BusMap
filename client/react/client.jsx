/**
 * Created by hnybom on 28.11.2015.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var BusMapApp = require('./components/BusMapApp.jsx');

$(document).ready(function() {

    ReactDOM.render(
        <BusMapApp />,
        document.getElementById('react-app')
    );
});