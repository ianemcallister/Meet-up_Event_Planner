var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', ['copy-html', 'copy-images', 'styles', 'lint'], function() {
	//default tasks go here
	gulp.watch('sass/**/*.scss', ['styles']);


});