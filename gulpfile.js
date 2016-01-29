var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var modRewrite = require('connect-modrewrite');

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src(['scss/app.scss', 'scss/docs.scss'])
    .pipe($.sass({
      includePaths: sassPaths
    })
    .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css/'));
});

// Static server
gulp.task('server:start', function() {
    browserSync({
      notify: false,
      server: {
        baseDir: "./"
      }
    });
});


gulp.task('default', ['sass', 'server:start'], function() {
  // gulp.watch('./**/*.html', [reload]);

  gulp.watch('scss/**/*.scss', ['sass', reload]);
});
