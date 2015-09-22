module.exports.setup = setup;
module.exports.client = null;

function setup() {
    if (module.exports.client)
        return;

    try {
        var redis = require('redis');
        module.exports.client = redis.createClient();
    } catch (e) {
        return e;
    }
}
