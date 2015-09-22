var assert = require('assert');
var harness = require('./harness');
var tvmaze = require('../');

describe('cache', function() {
    var err = tvmaze.cache.setup();
    assert.ifError(err, 'cache setup failed');

    beforeEach(function() {
        tvmaze.options.useCache = true;
    });
    beforeEach(function(done) {
        tvmaze.cache.save('search cached-show-name', '[{"show": {"id": -789}}]', done);
    });
    beforeEach(function(done) {
        tvmaze.cache.save('episodes -789', '[{"id": -456}]', done);
    });
});
