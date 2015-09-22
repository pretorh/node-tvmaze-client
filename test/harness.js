var nock = require('nock');
var fs = require('fs');

module.exports.nock = {
    setup: function(root, opts) {
        return nock(root)
            .persist()
            .get(opts.forUrl)
            .reply(200, fs.readFileSync(__dirname + '/testdata/' + opts.responseFile));
    },
    clear: function() {
        nock.cleanAll();
        nock.restore();
    },
    disableRealNetworkRequests: nock.disableNetConnect,
};
