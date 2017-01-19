/*
sudo npm install --save-dev gulp gulp-sass gulp-plumber gulp-pleeease gulp-concat gulp-uglify gulp-notify gulp-imagemin imagemin-pngquant del
*/

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	pleeease = require('gulp-pleeease'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	notify = require('gulp-notify'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant');
	//del = require('del');

/* Compile css
-------------------------- */
gulp.task('sass', function() {
	return gulp.src('*.scss')
    .pipe(plumber({errorHandler: notify.onError('Error on <gulp sass>: <%= error.message %>')}))
    .pipe(sass())
    .pipe(pleeease({
    	autoprefixer: {
    		browsers: ['ie 8', 'iOS 6', 'Android 4.0']
    	},
    	opacity: true
			//minifier: true
		}))
		.pipe(notify('Complete <gulp sass>'))
    .pipe(gulp.dest('./'));
});

/* Minify JavaScript
-------------------------- */
gulp.task('javascript', function() {
	gulp.src('./js/*.js')
	.pipe(concat('app.js'))
	.pipe(uglify())
	.pipe(notify('Complete <gulp javascript>'))
	.pipe(gulp.dest('./'));
});

/* html
-------------------------- */
gulp.task('html',function(){
  return gulp.src('./_dev/htdocs/**/*.html')
   // .pipe(minifyhtml())
    .pipe(gulp.dest('./_pub/htdocs'));
});

/* imagemin
-------------------------- */
gulp.task('imagemin', function () {
    gulp.src( './_dev/htdocs/shared/img/*.{png,jpg,gif}' )
    .pipe(imagemin())
    .pipe(gulp.dest( './_pub/htdocs/shared/img'));
});

/* Publish
-------------------------- */
gulp.task('copyDev', function() {
	return gulp.src('./_dev/**')
	.pipe(gulp.dest('./_pub'));
});

var delList = [
      './_pub/**/_*/*.scss',
			'./_pub/**/*.scss',
			'./_pub/**/_*/',
     // './_pub/**/_*.js',
			'./_pub/**/module/',
		];
gulp.task('delDev', ['copyDev'], function(){
	return del(delList);
});

gulp.task('imageMin', ['delDev'], function(){
	gulp.src(['./_pub/**/img/**/*'])
    .pipe(imagemin({
			progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
		}))
    .pipe(gulp.dest('./_pub'));
});
gulp.task('publish', ['copyDev', 'delDev', 'imageMin']);

/* =========================================== */

gulp.task('watch', function() {
	gulp.watch('*.scss', ['sass']);
  gulp.watch('./js/*.js', ['javascript']);
//	gulp.watch('./_dev/htdocs/**/*.html', ['html']);
//  gulp.watch('./_dev/htdocs/shared/img/*.{png,jpg,gif}',['imagemin']);
});
