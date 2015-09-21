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
            tvmaze.options.includeRaw = false;
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

        it('parses the episode details', function() {
            assertEpDetails(result[6]);
            assert.strictEqual(undefined, result[6]._raw, 'no raw details by details');
        });
    });

    it('can include raw details', function(done) {
        tvmaze.options.includeRaw = true;
        tvmaze.episodes(1871, function(err, res) {
            assert.notStrictEqual(undefined, res[6]._raw, 'raw details must be included');
            assert.strictEqual(undefined, res[6]._raw.aired, 'generated fields should not be on raw data');
            assert.strictEqual(undefined, res[6]._raw.episodeNumbed, 'generated fields should not be on raw data');
            done();
        });
    });

    function assertEpDetails(ep) {
        assert.equal(167384, ep.id);
        assert.equal('eps1.6_v1ew-s0urce.flv', ep.name);
        assert.equal('<p>Elliott goes missing; Mr. Robot tries to pull fsociety back together; Angela goes head-to-head with an old nemesis.</p>', ep.summary);
        assert.equal(new Date('2015-08-05T22:00:00-04:00') - 0, ep.aired - 0);
        assert.equal(1, ep.season);
        assert.equal(7, ep.episodeNumber);
    }
});
