/*eslint-env node, jasmine, phantomjs, es6, angular/di: [2,"array"] */

var gulp 			= require('gulp');
var less 			= require('gulp-less');
var babel 			= require('gulp-babel');
var concat 			= require('gulp-concat');
var coffee 			= require("gulp-coffee");
var order 			= require("gulp-order");
var print			= require('gulp-print').default;
var uglify 			= require('gulp-uglify');
var rename 			= require('gulp-rename');
var cleanCSS 		= require('gulp-clean-css');
var del 			= require('del');
var browserSync 	= require('browser-sync');
var server 			= browserSync.create();

//	OLD ELEMENTS
var eslint 			= require('gulp-eslint'); 
var jasmine 		= require('gulp-jasmine-phantom'); 
var sourcemaps 		= require('gulp-sourcemaps');
var ngAnnotate 		= require('gulp-ng-annotate');
var sass 			= require('gulp-sass');
var autoprefixer 	= require('gulp-autoprefixer');

var paths = {
	styles: {
		src: 'sass/**/*.scss',
		dest: 'dist/css/'
	},
	scripts: {
		src: 'js/**/*.js',
		dest: 'dist/js/'
	},
	index: {
		src: './index.html',
		dest: './dist'
	},
	html: {
		src: 'views/**/*.htm',
		dest: './dist/views'
	}
};

/*
 * Define our tasks using plain functions
 */
function clean() {
	return del([ 'assets' ]);
};

function styles() {
	return gulp.src(paths.styles.src)
	  .pipe(less())
	  .pipe(cleanCSS())
	  // pass in options to the stream
	  .pipe(rename({
		basename: 'main',
		suffix: '.min'
	  }))
	  .pipe(gulp.dest(paths.styles.dest));
};

function scripts() {
	return gulp.src(paths.scripts.src, { sourcemaps: true })
	  .pipe(order([
		'js/modules/app.module.js',
		'js/controllers/*.js',
		'js/directives/*.js',
		'js/factories/*.js',
		'js/routes/*.js'
	  ], { base: './' }))
	  .pipe(print())
	  .pipe(babel())
	  .pipe(ngAnnotate())
	  //.pipe(uglify())
	  .pipe(concat('main.min.js'))
	  .pipe(gulp.dest(paths.scripts.dest));
};

function index() {
	return gulp.src(paths.index.src)
		.pipe(gulp.dest(paths.index.dest));
};

function html() {
	return gulp.src(paths.html.src)
		.pipe(gulp.dest(paths.html.dest));
};

function watch() {
	gulp.watch(paths.index.src, gulp.series(index, reload));	
	gulp.watch(paths.html.src, gulp.series(html, reload));
	gulp.watch(paths.scripts.src, gulp.series(scripts, reload));
	gulp.watch(paths.styles.src, gulp.series(styles, reload));
};

function reload(done) {
	server.reload();
	done();
};

function serve(done) {
	server.init({
	  server: {
		baseDir: './dist'
	  }
	});
	done();
};

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build 	= gulp.parallel(styles, scripts, index, html);
var dev 	= gulp.series(styles, scripts, serve, watch);
/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
exports.dev = dev;
/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;