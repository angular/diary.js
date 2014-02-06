var gulp = require('gulp');
var pipe = require('pipe/gulp');

gulp.task('default', function() {
  gulp.src('src/diary.js')
    .pipe(pipe.traceur())
    .pipe(gulp.dest('compiled'));
});
