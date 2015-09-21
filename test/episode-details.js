var assert = require('assert');
var harness = require('./harness');
var tvmaze = require('../');

describe('episode', function() {
    var episodes = harness.nock.setup(tvmaze.options.rootUrl, {
        forUrl: '/shows/1871/episodes',
        responseFile: 'episodes.json'
    });

    describe('list', function() {
        var result;
        beforeEach(function(done) {
            tvmaze.episodes(1871, function(err, res) {
                result = res;
                done();
            });
        });

        it('gets the data via the api', function() {
            episodes.done();
        });

        it('returns the result in an array', function() {
            assert(result);
            assert.equal(10, result.length);
        });
    });
});
