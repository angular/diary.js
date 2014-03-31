var gulp = require('gulp');
var traceur = require('gulp-traceur');
var pipe = require('pipe/gulp');

var paths = {
  src: 'src/**/*.js'
};

gulp.task('build_src_amd', function() {
  gulp.src(paths.src)
    .pipe(traceur(pipe.traceur()))
    .pipe(gulp.dest('dist/amd'));
});

gulp.task('build_src_cjs', function() {
  gulp.src(paths.src)
    .pipe(traceur(pipe.traceur({modules: 'commonjs'})))
    .pipe(gulp.dest('dist/cjs'));
});

gulp.task('build_src_es6', function() {
  gulp.src(paths.src)
    .pipe(traceur(pipe.traceur({outputLanguage: 'es6'})))
    .pipe(gulp.dest('dist/es6'));
});

gulp.task('build', ['build_src_cjs', 'build_src_amd', 'build_src_es6']);
