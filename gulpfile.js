'use strict';

var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var plugins = require('gulp-load-plugins')();
var vulcanize = require('gulp-vulcanize');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback');
var del = require('del');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('serve', () => {
  browserSync.init({
    notify: false,
    watchOptions: {
      ignoreInitial: true,
      ignored: '*.txt'
    },
    host: 'mobile.hatiolab.com',
    port: 4500,
    // https: true,
    server: {
      baseDir: ['app'],
      // baseDir: ['./'],  // FIXME
      middleware: [historyApiFallback()]
    }
  });

  var reload = browserSync.reload;
  gulp.watch(['app/scripts/**/*', 'app/styles/**/*']).on("change", reload);
});

const fromPath = 'build/debug/app';
// const fromPath = 'build/build/app';
// const fromPath = 'build/es5-bundled/app';
// const fromPath = 'build/es6-bundled/app';
// const fromPath = 'build/es6-unbundled/app';
var from = (subpath) => {
  return subpath ? fromPath + '/' + subpath : fromPath;
};

var to = (subpath) => {
  const to = 'www';
  return !subpath ? to : path.join(to, subpath);
};

// Optimize images
gulp.task('optimizeImages', () => {
  var destImages = to('images');

  var iamges = gulp.src('app/images/**/*')
    .pipe(plugins.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(destImages))
    .pipe(plugins.size({
      title: 'images'
    }));
});

// gulp.task('scripts', () => {
//   var dest = to('scripts')

//   var assets = gulp
//     .src(from('/scripts/*.html'))
//     .pipe(gulp.dest(dest))
//     .pipe(plugins.size({ title: 'scripts' }))
// });

gulp.task('static', () => {
  var dest = to('static')

  var assets = gulp
    .src('app/static/**/*')
    .pipe(gulp.dest(dest))
    .pipe(plugins.imagemin({ progressive: true, interlaced: true }))
    .pipe(plugins.size({ title: 'static' }))
})

gulp.task('build', ['optimizeImages'], () => {
  var app = gulp
    .src(['app/index.html', 'app/lib/**/*'])
    .pipe(plugins.useref())
    .pipe(plugins.if('*.js', plugins.uglify()))
    .pipe(plugins.if('*.css', plugins.minifyCss()))
    .pipe(plugins.if('*.html', htmlmin({
          minifyJS: true,
          minifyCSS: true,
          removeComments: true
        })))
    .pipe(gulp.dest(to()))
    .pipe(plugins.size({ title: 'build-app' }))

  // gulp.src(from('index.html')).pipe(gulp.dest(to()));
});


gulp.task('simple-build', ['optimizeImages', 'static'], () => {
  var app = gulp
    .src(['app/index.html', 'app/lib/**/*'])
    .pipe(plugins.useref())
    .pipe(plugins.if('*.js', plugins.uglify()))
    .pipe(plugins.if('*.css', plugins.minifyCss()))
    .pipe(
      plugins.if(
        '*.html',
        htmlmin({
          minifyJS: true,
          minifyCSS: true,
          removeComments: true
        })
      )
    )
    .pipe(gulp.dest(to()))
    .pipe(plugins.size({ title: 'simple-build' }))
})

gulp.task('vulcanize', () => {
  return gulp.src(from('index.html'))
    .pipe(vulcanize({
      stripComments: true,
      inlineCss: true,
      inlineScripts: true
    }))
    .on('error', function (e) { console.log('vulc', e); })
    .pipe(htmlmin({
      minifyJS: true,
      minifyCSS: true,
      removeComments: true
    }))
    .on('error', function (e) { console.log('minify', e); })
    .pipe(gulp.dest(to()))
    .on('error', function (e) { console.log('save', e); })
    .pipe(plugins.size({
      title: 'vulcanize'
    }))
    .on('error', function (e) { console.log('final', e); });
});

gulp.task('clean', ['clean-cordova'], () => {
  return del(['build/*']).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});

gulp.task('clean-cordova', () => {
  return del(['www/*', 'platforms/browser/www/*', 'platforms/android/assets/*', 'platforms/android/build/intermediates/assets/*']).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});

var gulp = require("gulp");
var license = require('gulp-header-license');
var fs = require('fs');

gulp.task('license', function () {
  gulp.src('./app/scripts/**/*.js')
    .pipe(license('/*\n * Copyright © HatioLab Inc. All rights reserved.\n */\n'))
    .pipe(gulp.dest('./app/scripts/'));
  gulp.src('./app/scripts/**/*.html')
    .pipe(license('<!--\n@license\nCopyright © HatioLab Inc. All rights reserved.\n-->\n'))
    .pipe(gulp.dest('./app/scripts/'));
  gulp.src('./app/styles/**/*.html')
    .pipe(license('<!--\n@license\nCopyright © HatioLab Inc. All rights reserved.\n-->\n'))
    .pipe(gulp.dest('./app/styles/'));
});
