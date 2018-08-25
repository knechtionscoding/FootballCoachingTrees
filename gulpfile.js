var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var pkg = require('./package.json');
var sonarqubeScanner = require('sonarqube-scanner');

gulp.task('sonar', function(callback) {
  sonarqubeScanner({
    serverUrl : "https://sonarcloud.io",
    token : "a165ec629fb62e06cca87232110154399b899c0d",
    options : {
      "sonar.organization": "knechtionscoding-github"
    }
  }, callback);
});

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function() {

  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('./vendor/bootstrap'))

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'))

  // jQuery Easing
  gulp.src([
      'node_modules/jquery.easing/*.js'
    ])
    .pipe(gulp.dest('vendor/jquery-easing'))

})

// Default task
gulp.task('default', ['vendor']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Dev task
gulp.task('dev', ['browserSync'], function() {
  gulp.watch('./css/*.css', browserSync.reload);
  gulp.watch('./js/*.js', browserSync.reload);
  gulp.watch('./*.html', browserSync.reload);
});
