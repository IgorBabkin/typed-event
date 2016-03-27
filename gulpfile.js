var gulp = require('gulp');
var readFile = require('jsonfile').readFile;
var ts = require('gulp-typescript');
var del = require('del');
var merge = require('merge2');

gulp.task('dist', function () {
    readFile('./tsconfig.json', function (err, tsconfig) {
        var tsProject = ts.createProject(Object.assign({
            declaration: true,
            noExternalResolve: true
        }, tsconfig.compilerOptions));

        var tsStream = gulp.src('src/*.ts').pipe(ts(tsProject));
        merge([
            tsStream.dts.pipe(gulp.dest('dist')),
            tsStream.js.pipe(gulp.dest('dist'))
        ])
    });
});

gulp.task('clean', function () {
    del('dist/**');
});