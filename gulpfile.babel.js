import gulp from 'gulp';
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackCfg = require('./webpack.config.js');

gulp.task('default', ['build']);

gulp.task('watch', function () {
  gulp.watch('src/**/*.js', ['build']);
});

gulp.task('build', function () {
    // run webpack
    webpack(webpackCfg, function(err, stats) {
        if(err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            // output options
        }));
        //callback();
    });
    console.log('build');
});
