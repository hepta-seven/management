var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('cu-ctrl', function () {
    gulp.src(['js/ctrl/baseController.js', 'js/ctrl/*.js'])
        .pipe(concat('ctrl.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});
gulp.task('cu-service', function () {
    gulp.src(['js/service/baseService.js', 'js/service/*.js'])
        .pipe(concat('service.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});
gulp.task('watch', function () {
    gulp.watch('js/ctrl/*.js', ['cu-ctrl'], function (event) {
        console.log('Controller ' + event.path);
    });
    gulp.watch('js/service/*.js', ['cu-service'], function (event) {
        console.log('Controller ' + event.path);
    });
});
