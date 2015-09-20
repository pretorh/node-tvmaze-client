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

        result = JSON.parse(result)
            .map(mapSearchResponse);
        callback(err, result);
    }
}

function mapSearchResponse(entry) {
    return {
        id: entry.show.id,
        name: entry.show.name,
        year: new Date(entry.show.premiered).getFullYear(),
        status: entry.show.status,
        _raw: entry
    };
}
