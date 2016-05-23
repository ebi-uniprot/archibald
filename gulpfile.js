var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  cleanCss = require('gulp-clean'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  source = require('vinyl-source-stream');
  buffer = require('vinyl-buffer');
  sourcemaps = require('gulp-sourcemaps');
  browserify = require('browserify');
  ghPages = require('gulp-gh-pages');

var sassPaths = [
  'node_modules/foundation-sites/scss',
  'node_modules/motion-ui/src'
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
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

// transpile & move js
gulp.task('js:app', function() {
  var b = browserify({
      debug:true
    });
  b.add('app/scripts/app/app.js');
  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/scripts/app'))
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
    .pipe(gulp.dest('build/scripts/uniprot-style'))
    .pipe(gulp.dest('dist'))
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

gulp.task('serve', ['sass:uniprot-style', 'sass:app', 'js:uniprot-style',
'js:app', 'html'], function() {
  browserSync.init({
    server: "./build"
  });
});

gulp.task('watch', ['serve'], function() {
  // watch for changes
  gulp.watch('app/**/*.html', ['html']);
  gulp.watch('app/scss/**/*.scss', ['sass:uniprot-style', 'sass:app']);
  gulp.watch('app/scripts/**/*.js', ['js:uniprot-style','js:app']);
});

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});


// gulp.task('build')
