var assert = require('assert');
var harness = require('./harness');
var tvmaze = require('../');

describe('search', function() {
    var search = harness.nock.setup(tvmaze.options.rootUrl, {
        forUrl: '/search/shows?q=robot',
        responseFile: 'shows.json'
    });

    var res;
    beforeEach(function(done) {
        tvmaze.options.includeRaw = false;
        tvmaze.options.useCache = false;
        tvmaze.search('robot', function(err, result) {
            res = result;
            done();
        });
    });

    it('via the url', function() {
        search.done();
    });

    it('returns the result in array', function() {
        assert(res);
        assert.equal(3, res.length);
    });

    it('parses the show details', function() {
        assert.equal(1871, res[1].id);
        assert.equal('Mr. Robot', res[1].name);
        assert.equal(2015, res[1].year);
        assert.equal('Running', res[1].status);
        assert.strictEqual(undefined, res[1]._raw, 'does not include the raw response by default');
    });

    it('can include raw response', function(done) {
        tvmaze.options.includeRaw = true;
        tvmaze.search('robot', function(err, res) {
            assert.notStrictEqual(undefined, res[1]._raw, 'include the raw response');
            done();
        });
    });
});
