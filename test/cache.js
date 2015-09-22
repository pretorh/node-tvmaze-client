var assert = require('assert');
var harness = require('./harness');
var tvmaze = require('../');

describe('cache', function() {
    var err = tvmaze.cache.setup();
    var id = new Date() - 0;
    assert.ifError(err, 'cache setup failed');

    beforeEach(function() {
        harness.nock.disableRealNetworkRequests();
        tvmaze.options.useCache = true;
    });
    beforeEach(function(done) {
        tvmaze.cache.save('search cached-show-name', '[{"show": {"id": -' + id + '}}]', done);
    });
    beforeEach(function(done) {
        tvmaze.cache.save('episodes -' + id, '[{"id": -' + id + '}]', done);
    });

    it('returns search results from cache', function(done) {
        tvmaze.search('cached-show-name', function(err, result) {
            assert.ifError(err);
            assert.equal(1, result.length);
            assert.equal(-id, result[0].id);
            done();
        });
    });

    it('returns episode results from cache', function(done) {
        tvmaze.episodes(-id, function(err, result) {
            assert.ifError(err);
            assert.equal(1, result.length);
            assert.equal(-id, result[0].id);
            done();
        });
    });
});
