

var gulp = require('gulp');
// Requires the gulp-sass plugin
var less = require('gulp-less');

var browserSync = require('browser-sync').create();

//Optimizing CSS and JavaScript files
var useref = require('gulp-useref');


var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');




gulp.task('less', function(){

  return gulp.src('app/less/**/*.less')// Gets all files ending with .less in app/scss and children
    .pipe(less()) // Using gulp-sass
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Gulp watch syntax
gulp.task('watch', ['browserSync', 'less'], function(){
gulp.watch('app/less/**/*.less', ['less']);

// Reloads the browser whenever HTML or JS files change
 gulp.watch('app/*.html', browserSync.reload);
 gulp.watch('app/js/**/*.js', browserSync.reload);
})

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
   .pipe(gulpIf('*.js', uglify()))
   .pipe(gulpIf('*.css', cssnano()))
   .pipe(gulp.dest('dist'))

});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})
