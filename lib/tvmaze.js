module.exports.options = {
    rootUrl: "http://api.tvmaze.com",
    includeRaw: false,
};
module.exports.search = search;
module.exports.episodes = episodes;
module.exports.episodeDetail = episodeDetail;
module.exports.cache = require('./cache');

var request = require('request');
var options = module.exports.options;

function search(name, callback) {
    var url = buildUrl('/search/shows?q=' + name);
    requestData(url, 'search ' + name, parseResponse);

    function parseResponse(err, result) {
        if (err)
            return callback(err);

        result = JSON.parse(result)
            .map(mapSearchResponse);
        callback(err, result);
    }
}

function episodes(id, callback) {
    var url = buildUrl('/shows/' + id + '/episodes');
    requestData(url, 'episodes ' + id, parseResponse);

    function parseResponse(err, result) {
        if (err)
            return callback(err);

        result = JSON.parse(result)
            .map(mapEpisodeResponse);
        callback(null, result);
    }
}

function requestData(url, cacheKey, callback) {
    if (module.exports.options.useCache) {
        module.exports.cache.get(cacheKey, function(err, value) {
            if (value)
                return callback(null, value);

            requestFromService(url, callback);
        });
    } else {
        requestFromService(url, callback);
    }
}

function requestFromService(url, callback) {
    request.get(url, function(err, response, body) {
        if (err)
            return callback(err);

        callback(null, body);
    });
}

function episodeDetail(id, season, epNumber, callback) {
    episodes(id, gotList);
    function gotList(err, list) {
        if (err)
            return callback(err);

        list = list.filter(function(item) {
            return item.season == season && item.episodeNumber == epNumber;
        });
        callback(null, list[0]);
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

function mapEpisodeResponse(entry) {
    return {
        id: entry.id,
        name: entry.name,
        summary: entry.summary,
        season: entry.season,
        aired: new Date(entry.airstamp),
        episodeNumber: entry.number,
        _raw: options.includeRaw ? entry : undefined
    };
}

function buildUrl(s) {
    return options.rootUrl + s;
}
