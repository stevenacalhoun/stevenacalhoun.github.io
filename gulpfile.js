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
        images:   'app/images/**/*.{png,gif,jpg,jpeg,svg}',
        vendor:   'vendor'
      };

gulp.task('html', function (cb) {
  return gulp.src(paths.html)
    .pipe(gulp.dest('.tmp'))
    .pipe(browserSync.reload({stream: true}));
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

gulp.task('images', function () {
  return gulp.src(paths.images)
    .pipe($.imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: []
    }))
    .pipe(gulp.dest('dist/images'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(paths.html, ['html'])
    gulp.watch(paths.styles, ['styles']);
});

// Default Task
gulp.task('default', ['styles', 'watch', 'images']);

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

gulp.task('gh-pages', function () {
  return gulp.src('dist/**/*')
    .pipe($.ghPages({
      branch: 'master'
    }))
});

gulp.task('build', ['html', 'styles', 'images'], function() {
  gulp.src(['.tmp/**/*', 'app/files/**/*', paths.vendor])
    .pipe(gulp.dest('dist'))
})

gulp.task('serve', function () {
  runSequence(['browser-sync', 'watch']);
});

gulp.task('deploy', function () {
  production = true;
  runSequence('build', 'gh-pages');
});
