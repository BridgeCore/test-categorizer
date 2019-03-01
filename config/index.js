var nconf = require('nconf');
var path = require('path');

// use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. A file located at './config.json'
nconf.argv()
    .env()
    .file(
        path.join(__dirname, 'config.json')
    );

module.exports = nconf;