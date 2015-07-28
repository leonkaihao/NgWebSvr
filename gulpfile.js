var gulp = require('gulp');
var del = require('del');
var uglifyJs = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-html-minifier');
var ngAnnotate = require('gulp-ng-annotate');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var gulpFilter = require('gulp-filter');
var stripJsonComments = require('gulp-strip-json-comments');
var jeditor = require("gulp-json-editor");
var jsonlint = require("gulp-jsonlint");
var concat = require('gulp-concat');
var rename = require('gulp-rename'); //not used now, maybe later
var coveralls = require('gulp-coveralls');

gulp.task('clean', function(cb){
    del(['dist'], cb);
});

gulp.task('coveralls', function(){
    return gulp.src('./coverage/lcov.info')
        .pipe(coveralls());
});

gulp.task('jshint', function() {
    var ngFilter = gulpFilter([
        'public/ng/*.js',
        'public/ng/**/*.js'
    ]);
    var jsFilter = gulpFilter([
        'app.js',
        'routes/*.js',
        'controllers/*.js',
        'services/**/*.js'
    ]);

    return gulp.src(['**'])
        //tune angular file
        .pipe(ngFilter)
        .pipe(jshint())
        .pipe(ngFilter.restore()).on('error', errHandler)
        //tune nodejs file
        .pipe(jsFilter)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jsFilter.restore()).on('error', errHandler);
});

gulp.task('build', ['clean'], function () {
    var ngFilter = gulpFilter([
        'public/ng/*.js',
        'public/ng/**/*.js'
    ]);
    var jsFilter = gulpFilter([
        'app.js',
        'routes/*.js',
        'controllers/*.js',
        'services/**/*.js'
    ]);
    var cssFilter = gulpFilter(['public/stylesheets/*.css']);
    var htmlFiler = gulpFilter(['views/*.ejs']);
    var configFilter = gulpFilter(['config.json']);
    var ngPath = 'public/ng';


    return gulp.src(['**', '!node_modules/','!node_modules/**', '!gulpfile.js', '!dist/', '!dist/**', '!public/lib/', '!public/lib/**', '!views/component.ejs'])
        //tune angular file
        .pipe(ngFilter)
        .pipe(ngAnnotate())
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(concat(ngPath + '/my-ng.min.js'))
        .pipe(uglifyJs())
        .pipe(ngFilter.restore()).on('error', errHandler)
        //tune nodejs file
        .pipe(jsFilter)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(uglifyJs())
        .pipe(jsFilter.restore()).on('error', errHandler)
        //tune css file
        .pipe(cssFilter)
        .pipe(minifyCss()).on('error', errHandler)
        .pipe(cssFilter.restore())
        //tune html file
        .pipe(htmlFiler)
        .pipe(minifyHtml()).on('error', errHandler)
        .pipe(htmlFiler.restore())
        //tune config file
        .pipe(configFilter)
        .pipe(stripJsonComments())
        .pipe(jsonlint())
        .pipe(jsonlint.failOnError())
        .pipe(jsonlint.reporter())
        .pipe(jeditor(function(json) {
            json.env = "product";
            return json;
        }))
        .pipe(configFilter.restore())
        //output to dest folder
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);

function errHandler(error) {
    console.error(error);
    this.emit('end');
}
