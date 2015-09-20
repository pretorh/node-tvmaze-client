var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');

var allFiles = ['test/*.js', 'lib/*.js', '*.js'];

gulp.task('default', ['watch']);

gulp.task('watch', function() {
    gulp.watch(allFiles, ['test']);
});

gulp.task('test', function() {
    return gulp.src(['test/*.js'], { read: false })
        .pipe(mocha())
        .on('error', console.error);
});

gulp.task('hint', function() {
    return gulp.src(allFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
