var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var browser = require('browser-sync').create();
var gulpmaps = require('gulp-sourcemaps');
var glob = require('gulp-sass-glob');
var watch = require('gulp-watch');

var paths = { 
    sass_src: 'sass/**/*.{scss,sass}',
    sass_dest: 'css',
    js_src: 'js/source/*.js',
    js_dest: 'js/build'
};

var browsersList = ['last 5 versions', '> 5%'];

/*
var autoprefixerOption = {
    grid: true,
    browsers: browsersList
};
*/

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
});

gulp.task('default', ['sass', 'watch']);