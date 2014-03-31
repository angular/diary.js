var gulp = require('gulp');
var traceur = require('gulp-traceur');
var pipe = require('pipe/gulp');

gulp.task('default', function() {
  gulp.src('src/diary.js')
    .pipe(traceur(pipe.traceur()))
    .pipe(gulp.dest('compiled'));
});
