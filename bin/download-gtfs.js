/**
 * Created by hnybom on 26.11.2015.
 */
var download = require('../node_modules/gtfs/scripts/download');
config = require('../config.js');

download(config, function(e) {
    if(e) {
        console.error(e || 'Unknown Error');
        process.exit(1);
    } else {
        console.log('Completed Generating HTML schedules');
        process.exit();
    }
});