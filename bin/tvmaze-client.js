var tvmaze = require('../');

tvmaze.search(process.argv[2], printReponse);

function printReponse(err, res) {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log(JSON.stringify(res, null, 2));
}
