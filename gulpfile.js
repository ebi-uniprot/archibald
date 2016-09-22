var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  file = require('gulp-file'),
  concat = require('gulp-concat'),
  insert = require('gulp-insert'),
  uglify = require('gulp-uglify'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  cleanCss = require('gulp-clean'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  sourcemaps = require('gulp-sourcemaps'),
  browserify = require('browserify'),
  ghPages = require('gulp-gh-pages'),
  imagemin = require('gulp-imagemin'),
  argv = require('yargs').argv;

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass:app', function() {
  return gulp.src('app/scss/app/app.scss')
    .pipe(sass({
        includePaths: sassPaths,
        outputStyle: 'compressed' // if css compressed **file size**
      })
      .on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('build/css/'))
    .pipe(browserSync.stream());
});

gulp.task('sass:archibald-style', function() {
  return gulp.src('app/scss/archibald/archibald-style.scss')
    // .pipe(sourcemaps.init())
    .pipe(sass({
        includePaths: sassPaths,
        outputStyle: 'compressed' // if css compressed **file size**
      })
      .on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    // .pipe(cleanCss())
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css/'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('copy', function() {
  gulp.src(['node_modules/normalize.css/normalize.css',
            'node_modules/font-awesome/css/font-awesome.css'])
      .pipe(gulp.dest('build/css'));
  gulp.src(['bower_components/jquery/dist/jquery.min.js',
            'bower_components/foundation-sites/dist/foundation.min.js',
            'app/scripts/vendor/**/*.js'])
      .pipe(gulp.dest('build/scripts/archibald'));
  gulp.src('node_modules/font-awesome/fonts/**.*')
      .pipe(gulp.dest('build/fonts'));
});

gulp.task('imagemin', function(){
  gulp.src('app/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'))
});

gulp.task('svgmin', function(){
  gulp.src('app/svg/*.svg')
    .pipe(imagemin())
    .pipe(gulp.dest('build/svg'));
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

gulp.task('js:archibald-style', function() {
  return gulp.src('app/scripts/archibald/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('archibald-style.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/scripts/archibald-style'))
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

gulp.task('serve', ['sass:archibald-style', 'sass:app', 'js:archibald-style',
'js:app', 'html', 'copy', 'imagemin', 'svgmin'], function() {
  browserSync.init({
    server: "./build"
  });
});

gulp.task('watch', ['serve'], function() {
  // watch for changes
  gulp.watch('app/**/*.html', ['html']);
  gulp.watch('app/scss/**/*.scss', ['sass:archibald-style', 'sass:app']);
  gulp.watch('app/scripts/**/*.js', ['js:archibald-style','js:app']);
});

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages({
      force : true
    }));
});

gulp.task('create', function() {
  var name = argv.pattern;
  console.log('Creating pattern "' + name + '"');
  file('_' + name + '.scss', '', { src: true })
    .pipe(gulp.dest('app/scss/archibald/molecules/'));
  console.log('SCSS created');
  file(name + '.html', '<div class=\"pattern-element\"><h2 class=\"pattern-element-header\">' + name + '</h2></div>', { src: true })
    .pipe(gulp.dest('app/views/molecules/'));
  console.log('html created');
  gulp.src('app/scss/archibald/archibald-style.scss')
      .pipe(insert.append('@import \'molecules/' + name + '\';'))
      .pipe(gulp.dest('app/scss/archibald/'));
});


// gulp.task('build')
