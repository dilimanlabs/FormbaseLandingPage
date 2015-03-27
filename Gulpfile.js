var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var merge = require('merge-stream');
var nib = require('nib');

// Lint JS
gulp.task('jshint', function () {
    return gulp.src(['src/**/*.js'])
        .pipe(reload({ stream: true, once: true }))
        .pipe($.jshint.extract())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('images', function () {
    return gulp.src('src/images/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size({ title: 'images' }));
});

// Copy all files at src
gulp.task('copy', function () {
    var app = gulp.src([
        'src/*',
        'node_modules/apache-server-configs/dist/.htaccess'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));

    var bower = gulp.src(['bower-components/**/*'])
        .pipe(gulp.dest('dist/bower_components'));

    return merge(app, bower).pipe($.size({ title: 'copy' }));
});

// fonts
gulp.task('fonts', function () {
    return gulp.src(['src/fonts/**'])
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size({title: 'fonts'}));
});

gulp.task('styles', function () {
    return gulp.src(['src/styles/main.styl'])
        .pipe($.stylus({ use: nib() }))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe(gulp.dest('dist/styles'))
        .pipe($.size({ title: 'styles' }));
});

gulp.task('scripts', function () {
    return gulp.src(['src/scripts/app.js'])
        .pipe($.browserify())
        .pipe(gulp.dest('.tmp/scripts'))
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('elements', function() {
    return gulp.src([
        'src/elements/**/*.styl'
    ])
        .pipe($.stylus({ use: nib() }))
        .pipe(gulp.dest('.tmp/elements'))
        .pipe(gulp.dest('dist/elements'))
        .pipe($.size({title: 'elements'}));
});

gulp.task('html', function () {
    var assets = $.useref.assets({ searchPath: ['.tmp', 'src', 'dist'] });
    return gulp.src(['src/*.html'])
        .pipe($.if('*.html', $.replace('elements/elements.html', 'elements/elements.vulcanized.html')))
        .pipe(assets)
        .pipe($.if('*.js', $.uglify({ preserveComments: 'some' })))
        .pipe($.useref())
        .pipe($.if('*.html', $.minifyHtml({
            quotes: true,
            empty: true,
            spare: true
        })))
        .pipe(gulp.dest('dist'))
        .pipe($.size({ title: 'html' }));
});

gulp.task('vulcanize', function () {
    var DEST_DIR = 'dist/elements';

    return gulp.src('dist/elements/elements.vulcanized.html')
        .pipe($.vulcanize({
            dest: DEST_DIR,
            strip: true
        }))
        .pipe(gulp.dest(DEST_DIR))
        .pipe($.size({title: 'vulcanize'}));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'scripts', 'elements'], function () {
    browserSync({
        notify: false,
        server: {
            baseDir: ['.tmp', 'src'],
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    });
    gulp.watch(['src/**/*.html'], reload);
    gulp.watch(['src/styles/**/*.styl'], ['styles', reload]);
    gulp.watch(['src/elements/**/*.styl'], ['elements', reload]);
    gulp.watch(['src/scripts/**/*.js'], ['jshint', 'scripts', reload]);
    gulp.watch(['src/images/**/*'], reload);
});

gulp.task('serve:dist', ['default'], function () {
    browserSync({
        notify: false,
        server: 'dist'
    });
});

gulp.task('default', ['clean'], function (cb) {
    runSequence(
        ['copy', 'styles'],
        'elements',
        ['jshint', 'images', 'fonts', 'html'],
        cb
    );
});

