module.exports.options = {
    rootUrl: "http://api.tvmaze.com",
    includeRaw: false,
};
module.exports.search = search;
module.exports.episodes = episodes;
module.exports.episodeDetail = episodeDetail;

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

function episodes(id, callback) {
    request.get(buildUrl('/shows/' + id + '/episodes'), parseResponse);

    function parseResponse(err, res, result) {
        if (err)
            return callback(err);

        result = JSON.parse(result)
            .map(mapEpisodeResponse);
        callback(null, result);
    }
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
