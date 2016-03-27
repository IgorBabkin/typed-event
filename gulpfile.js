var gulp = require('gulp');
var readFile = require('jsonfile').readFile;
var ts = require('gulp-typescript');
var del = require('del');
var merge = require('merge2');
var tslint = require("gulp-tslint");
var mocha = require("gulp-mocha");
var tsNodeRegister = require("ts-node/register");

gulp.task('dist', function () {
    readFile('./tsconfig.json', function (err, tsconfig) {
        var tsProject = ts.createProject(Object.assign({
            declaration: true,
            noExternalResolve: true
        }, tsconfig.compilerOptions));

        var tsStream = gulp.src('src/*.ts')
            .pipe(ts(tsProject));

        merge([
            tsStream.dts.pipe(gulp.dest('dist')),
            tsStream.js.pipe(gulp.dest('dist'))
        ])
    });
});

gulp.task('clean', function () {
    del('dist/**');
});

gulp.task('lint', function () {
    gulp.src(['src/*.ts', 'test/*.ts'])
        .pipe(tslint())
        .pipe(tslint.report("prose", {
            // emitError: false,
            reportLimit: 2
        }));
});

gulp.task('test', function () {
     gulp.src('test/*.ts')
         .pipe(mocha({
             require: tsNodeRegister
         }));
});