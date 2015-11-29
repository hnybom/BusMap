var React = require('react');
var Map = require('./Map.jsx');

module.exports = BusMapApp = React.createClass({
    // Render the component
    render: function(){
        return (
            <div className="busmap-app">
                <Map />
            </div>
        )
    }
});
