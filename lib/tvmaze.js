module.exports.options = {
    rootUrl: "http://api.tvmaze.com",
    includeRaw: false,
};
module.exports.search = search;
module.exports.episodes = episodes;
module.exports.episodeDetail = episodeDetail;

var fetch = require('node-fetch');
var options = module.exports.options;

function search(name, callback) {
    var url = buildUrl('/search/shows?q=' + name);
    requestData(url, parseResponse);

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
    requestData(url, parseResponse);

    function parseResponse(err, result) {
        if (err)
            return callback(err);

        result = JSON.parse(result)
            .map(mapEpisodeResponse);
        callback(null, result);
    }
}

function requestData(url, callback) {
    fetch(url)
        .then(function (response) {
            // TODO: move json parsing from functions here
            return response.text();
        })
        .then(function (data) {
            callback(null, data);
        })
        .catch(callback);
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
