const gulp = require('gulp');
const del = require('del');


const PARCEL_SERVE_CACHE = '../output/parcel-serve-cache/**/*';
const PARCEL_SERVE       = '../output/parcel-serve/**/*';
const PARCEL_BUILD       = '../output/parcel-build/**/*';
const ELECTRON_DIST      = '../output/electron-dist/**/*';


gulp.task('clear-output:electron-dist', function(){
	return del([ ELECTRON_DIST ], { force: true });
});

gulp.task('clear-output:serve-cache', function(){
	return del([ PARCEL_SERVE_CACHE ], { force: true });
});

gulp.task('clear-output:serve', function(){
	return del([ PARCEL_SERVE ], { force: true });
});

gulp.task('clear-output:build', function(){
	return del([ PARCEL_BUILD ], { force: true });
});

gulp.task('clear-output', gulp.parallel([ 'clear-output:serve-cache', 'clear-output:serve', 'clear-output:build' ]));

gulp.task('default', gulp.series([ 'clear-output' ]));