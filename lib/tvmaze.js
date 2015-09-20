module.exports.options = {
    rootUrl: "http://api.tvmaze.com",
};
module.exports.search = search;

var request = require('request');

function search(name, callback) {
    request.get(module.exports.options.rootUrl + '/search/shows?q=' + name, parseResponse);

    function parseResponse(err, res, result) {
        if (err)
            return callback(err);

        result = JSON.parse(result);
        callback(err, result);
    }
}
