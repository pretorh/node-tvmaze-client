module.exports.setup = setup;
module.exports.save = save;
module.exports.get = get;
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

function save(key, value, callback) {
    if (!module.exports.client)
        return callback();
    module.exports.client.set(key, value, callback);
}

function get(key, callback) {
    if (!module.exports.client)
        return callback();
    module.exports.client.get(key, callback);
}
