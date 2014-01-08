var gulp = require('gulp');
var traceur = require('gulp-traceur');

gulp.task('default', function() {
  gulp.src('src/diary.js')
    .pipe(traceur())
    .pipe(gulp.dest('compiled'));
});
