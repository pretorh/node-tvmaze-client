module.exports.options = {
    rootUrl: "http://api.tvmaze.com",
};
module.exports.search = search;

var request = require('request');

function search(name, callback) {
    request.get(module.exports.options.rootUrl + '/search/shows?q=' + name, callback);
}
