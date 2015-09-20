module.exports.options = {
    rootUrl: "http://api.tvmaze.com",
    includeRaw: false,
};
module.exports.search = search;

var request = require('request');
var options = module.exports.options;

function search(name, callback) {
    request.get(buildUrl('/search/shows?q=' + name), parseResponse);

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
        _raw: options.includeRaw ? entry : undefined
    };
}

function buildUrl(s) {
    return options.rootUrl + s;
}
