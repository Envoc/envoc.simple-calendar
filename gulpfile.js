var gulp            = require('gulp');
var concat          = require('gulp-concat');
var ngAnnotate      = require('gulp-ng-annotate');
var gutil           = require("gulp-util");
var webpack         = require("gulp-webpack");
var runSequence     = require('run-sequence');
var browserSync     = require('browser-sync');
var rimraf          = require('rimraf');
var uglify          = require('gulp-uglify');
var webpack_config  = require("./webpack.config.js");

var reload      = browserSync.reload;

var dist ='./dist'
var main = './src/lib/index.js';

gulp.task('default', function(cb){
  runSequence('build-deploy', cb) // 'browser-sync'
});

gulp.task('build-deploy', function(cb){
  runSequence('clean', ['css', 'webpack'], cb)
});

gulp.task('clean', function (cb) {
    rimraf(dist, cb);
});

gulp.task("webpack", function() {
  return gulp.src(main)
    .pipe(webpack(webpack_config))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest(dist))
    .pipe(reload({stream: true}));
});

gulp.task('css', function() {
  return gulp.src('./src/css/app.css')
    .pipe(concat('ngSimpleCalendar.css'))
    .pipe(gulp.dest(dist))
    .pipe(reload({stream: true}));
});

gulp.task('serve', function(cb){
  runSequence('build-deploy', 'browser-sync', cb)
});

// browser-sync task for starting the server.
gulp.task('browser-sync', function(done) {
    browserSync({
        server: { baseDir: './' }
    });

    gulp.watch("./src/**/*.js", ['webpack']);
    gulp.watch("./src/**/*.css", ['css']);
    gulp.watch("./dist/**/*.*", [function(cb){
      reload()
    }]);
});