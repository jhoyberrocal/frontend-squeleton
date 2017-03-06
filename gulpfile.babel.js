/**
 * Created by Jhoy on 02/03/2017.
 */
import gulp from 'gulp';
import bs from 'browser-sync';
import babelify from 'babelify';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import browserify from 'browserify';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import fs from 'fs';
import shell from 'shelljs'

const reload = bs.reload;

gulp.task('css', () => {
  let proccess = [
    autoprefixer,
    cssnano
  ];
  gulp.src('app/sass/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(proccess))
    .pipe(gulp.dest('public/'))
});

gulp.task('js', () => {
  let bundler = browserify('app/scripts/main.js');
  bundler.transform(babelify);

  bundler.bundle()
    .on('error', (err) => { console.error(err); })
    .pipe(fs.createWriteStream('public/bundle.js'));
});

gulp.task('serve', ['css', 'js'], () => {
  bs.init({
    proxy: 'localhost:8083'
  });

  gulp.watch('app/views/**/*.ejs').on('change', reload);
  gulp.watch('app/sass/**/*.scss', ['css', reload]);
});

gulp.task('default', () => {
   shell.exec('npm start');
   console.log('Gulp Node');
});