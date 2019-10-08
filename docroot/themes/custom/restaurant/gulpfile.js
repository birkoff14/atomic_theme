var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var browser = require('browser-sync').create();
var gulpmaps = require('gulp-sourcemaps');
var glob = require('gulp-sass-glob');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');

var paths = { 
    sass_src: 'sass/**/*.{scss,sass}',
    sass_dest: 'css',
    js_src: 'js/source/*.js',
    js_dest: 'js/build',
    font_awesome: 'node_modules/@fortawesome/fontawesome-free/webfonts/*'
};

var browsersList = ['last 5 versions', '> 5%'];

var autoprefixerOption = {
    grid: true,
    browsers: browsersList
};

gulp.task('sass', function(){
    return gulp.src(paths.sass_src)
      .pipe(gulpmaps.init())
      .pipe(glob())
      .pipe(sass({ outputStyle: 'expanded'}).on('error', sass.logError))
      .pipe(gulpmaps.write({includeContent:false}))
      .pipe(gulpmaps.init({loadMaps:true}))
      .pipe(gulpmaps.write('.'))
      //.pipe(autoprefixer(autoprefixerOption))
      .pipe(gulp.dest(paths.sass_dest))
      .pipe(browser.stream())
});

gulp.task('watch', function () {
    gulp.watch(paths.sass_src, ['sass']);
    gulp.watch(paths.js_src, ['js']);
    browser.reload();
});

gulp.task('icons', function() {
    return gulp.src(paths.font_awesome)
        .pipe(gulp.dest('webfonts'));
});

gulp.task('browser-sync', function() {
    browser.init({
        proxy: "birkoff:1701"
    });
});

gulp.task('js', function() {
    return gulp.src(paths.js_src)
        .pipe(gulpmaps.init())
        .pipe(uglify())
        .pipe(gulpmaps.write('.'))
        .pipe(gulp.dest(paths.js_dest));
});

gulp.task('default', ['sass', 'js', 'icons', 'browser-sync', 'watch']);