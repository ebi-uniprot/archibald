var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  cleanCss = require('gulp-clean'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps');


var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass:app', function() {
  return gulp.src('app/scss/app/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        errLogToConsole: true
      })
      .on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(cleanCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css/'))
    .pipe(browserSync.stream());
});

gulp.task('sass:uniprot-style', function() {
  return gulp.src('app/scss/uniprot-style/uniprot-style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        includePaths: sassPaths,
        errLogToConsole: true
      })
      .on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(cleanCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css/'))
    .pipe(browserSync.stream());
});

// transpile & move js
gulp.task('js:app', function() {
  return gulp.src('app/scripts/app/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/scripts/'))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }));
});

gulp.task('js:uniprot-style', function() {
  return gulp.src('app/scripts/uniprot-style/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('uniprot-style.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/scripts/'))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }));
});

// move html
gulp.task('html', function() {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }));
});

// inject bower components
gulp.task('wiredep', function() {
  var wiredep = require('wiredep').stream;
  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
      directory: 'app/bower_components'
    }))
    .pipe(gulp.dest('app/styles'));
  gulp.src('app/*.html')
    .pipe(wiredep({
      directory: 'app/bower_components',
      exclude: ['bootstrap-sass-official']
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('serve', ['sass:uniprot-style', 'sass:app', 'js:uniprot-style',
'js:app', 'html'], function() {
  browserSync.init({
    server: "./build"
  });
});

gulp.task('watch', ['serve'], function() {
  // watch for changes
  gulp.watch('app/*.html', ['html']);
  gulp.watch('app/scss/**/*.scss', ['sass:uniprot-style', 'sass:app']);
  gulp.watch('app/scripts/**/*.js', ['js:uniprot-style','js:app']);
  gulp.watch('bower.json', ['wiredep']);
});
