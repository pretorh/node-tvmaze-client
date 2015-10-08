module.exports.setup = setup;
module.exports.save = save;
module.exports.get = get;
module.exports.CACHE_TIMEOUT_SECONDS = 7 * 24 * 3600;   // 1 week by default
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
    module.exports.client.expire(key, module.exports.CACHE_TIMEOUT_SECONDS);
}

function get(key, callback) {
    if (!module.exports.client)
        return callback();
    module.exports.client.get(key, callback);
}
