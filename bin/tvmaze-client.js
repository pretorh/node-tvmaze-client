var tvmaze = require('../');
var opt = require('node-getopt').create([
]).bindHelp().parseSystem();

var command = opt.argv[0];
var args = opt.argv.slice(1);
if (!command) {
    usageError('need command as first parameter');
}

if (command == 'h') {
    usage();
} else if (command === 's') {
    argCountCheck(1);
    tvmaze.search(args[0], printReponse);
} else if (command === 'l') {
    argCountCheck(1);
    tvmaze.episodes(args[0], printReponse);
}

function usage() {
    console.log('h              help');
    console.log('s <show>       search for show');
    console.log('l <id>         list episodes for show id');
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
}
