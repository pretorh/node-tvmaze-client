var tvmaze = require('../');

// parse options

var opt = require('node-getopt').create([
    ['',    'raw',      'include raw details in result'],
    ['',    'cache',    'use redis as cache'],
]).bindHelp().parseSystem();

var command = opt.argv[0];
var args = opt.argv.slice(1);
if (!command) {
    usageError('need command as first parameter');
}

// set options
tvmaze.options.includeRaw = opt.options.raw;
tvmaze.options.useCache = opt.options.cache;

// setup
if (tvmaze.options.useCache) {
    var err = tvmaze.cache.setup();
    if (err)
        throw err;
}

// parse command

if (command == 'h' || command == 'help') {
    usage();
} else if (command === 's' || command == 'search') {
    argCountCheck(1);
    tvmaze.search(args[0], printReponse);
} else if (command === 'l' || command == 'list') {
    argCountCheck(1);
    tvmaze.episodes(args[0], printReponse);
} else if (command === 'e' || command == 'episode') {
    argCountCheck(3);
    tvmaze.episodeDetail(args[0], args[1], args[2], printReponse);
}

function usage() {
    console.log('h | help                                   help');
    console.log('s | search <show>                          search for show');
    console.log('l | list <id>                              list episodes for show id');
    console.log('e | episode <id> <season> <ep number>      list episodes for show id');
}

function argCountCheck(expect) {
    if (args.length != expect)
        usageError('expected ' + expect + ' argument');
}

function usageError(s) {
    console.error(s);
    process.exit(1);
}

function printReponse(err, res) {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log(JSON.stringify(res, null, 2));
    process.exit(0);
}
