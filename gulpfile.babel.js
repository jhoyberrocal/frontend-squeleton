/**
 * Created by Jhoy on 02/03/2017.
 */
import gulp from 'gulp';
import bs from 'browser-sync';
import babelify from 'babelify';
import browserify from 'browserify';
import fs from 'fs';

const reload = bs.reload;

gulp.task('js', () => {
  let bundler = browserify('app/scripts/main.js');
  bundler.transform(babelify);

  bundler.bundle()
    .on('error', (err) => { console.error(err); })
    .pipe(fs.createWriteStream('public/bundle.js'));
});

gulp.task('serve', () => {
  bs.init({
    proxy: 'localhost:8083'
  });

  gulp.watch('app/views/**/*.ejs').on('change', reload);
});

gulp.task('default', () => {
  console.log('Gulp ecma6 Yeahh!!');
});