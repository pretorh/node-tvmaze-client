var assert = require('assert');
var nock = require('nock');
var fs = require('fs');
var tvmaze = require('../');

describe('search', function() {
    var search = nock(tvmaze.options.rootUrl)
        .persist()
        .get('/search/shows?q=robot')
        .reply(200, fs.readFileSync(__dirname + '/testdata/shows.json'));
    after(function() {
        nock.cleanAll();
        nock.restore();
    });

    it('search via the url', function(done) {
        tvmaze.search('robot', function(err) {
            search.done();
            done();
        });
    })

    it('returns the result in array', function(done) {
        tvmaze.search('robot', function(err, res) {
            assert(res);
            assert.equal(3, res.length);
            done();
        });
    });
});
