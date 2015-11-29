/**
 * Created by hnybom on 28.11.2015.
 */
var http = require('http');
var Repeat = require('repeat');

Repeat(updateLocations).every(2000, 'ms').start.now();
var myio;

function updateLocations() {
    var lissuPath = '/ajax_servers/busLocations.php?ts=';
    var lissuHost = 'lissu.tampere.fi';

    var options = {
        host: lissuHost,
        path: lissuPath + Date.now(),
        port: 80,
        method: 'GET'
    };

    http.get(options, function(res) {
        res.setEncoding('utf8');
        var wholeData = '';
        res.on('data', function (chunk) {
            wholeData += chunk;
        });
        res.on('end', function() {
            var wholeDataJson = JSON.parse(wholeData);
            if(myio) {
                myio.emit('buslocations', wholeDataJson);
            }

        })
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
}

exports.bindIo = function(io) {
    myio = io;
};