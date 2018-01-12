var gulp = require('gulp');
var sass = require('gulp-sass');

// Compile SASS
gulp.task('sass', function() {
    return gulp.src('scss/main.scss')
               .pipe(sass())
               .pipe(gulp.dest('public/css'));
});

// Watch changes
gulp.task('watch', function() {
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('scss/*/*.scss', ['sass']);
});

// Default task
gulp.task('default', ['sass']);
