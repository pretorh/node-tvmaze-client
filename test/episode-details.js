var assert = require('assert');
var harness = require('./harness');
var tvmaze = require('../');

describe('episode', function() {
    var episodes = harness.nock.setup(tvmaze.options.rootUrl, {
        forUrl: '/shows/1871/episodes',
        responseFile: 'episodes.json'
    });

    describe('list', function() {
        it('gets the data via the api', function(done) {
            tvmaze.episodes(1871, function() {
                episodes.done();
                done();
            });
        });
    });
});
