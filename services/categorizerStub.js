var conf = require('../config');

function getData(test) {
    return conf.get(test);
}
module.exports.getData = getData;