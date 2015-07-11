var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence'),
    del = require('del');

  var production = false,
      paths = {
        app:      'app',
        html:     'app/**/*.html',
        styles:   'app/styles/**/*.scss',
      };

gulp.task('html', function (cb) {
  var spawn  = require('child_process').spawn,
      jekyll = spawn('jekyll', ['build', '-q', '-s', paths.app, '-d', '.tmp'], { stdio: 'inherit' });

  jekyll.on('exit', function (code) {
    cb(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
    browserSync.reload();
  });
});

gulp.task('styles', function () {
  return $.rubySass('app/styles/', {
      style: 'nested',
      loadPath: [paths.styles],
      onError: console.error.bind(console, 'Sass error:')
    })
    .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(browserSync.reload({ stream: true }));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(paths.html, ['html'])
    gulp.watch(paths.styles, ['styles']);
});

// Default Task
gulp.task('default', ['html', 'styles', 'watch']);

gulp.task('browser-sync', ['html', 'styles'], function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', paths.app],
      routes: {
        '/vendor': 'vendor'
      }
    }
  });
});

gulp.task('serve', function () {
  runSequence(['browser-sync', 'watch']);
});
