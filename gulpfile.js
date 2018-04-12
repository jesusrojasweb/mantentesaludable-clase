const gulp = require('gulp'),
	postcss = require('gulp-postcss'),
	  cssnext = require('postcss-cssnext'),
	  atImport = require('postcss-import'),
	  cssnano = require('cssnano'),
	  mqpacker = require('css-mqpacker'),
    fontMagician = require('postcss-font-magician'),
	browserSync = require('browser-sync').create()

// Servidor de desarrollo
gulp.task('serve', () => {
	browserSync.init({
    server: './'
  });
 })
gulp.task('css', ()=>{

  const processor = [
    atImport(),
    fontMagician({
      variants: {
          'Ubuntu': {
            '500': [],
            '700': []
          },
          'Montserrat': {
            '400': [],
            '600': []
          }
        }
      }),
    //cssnested,
    cssnext({browsers: ['> 5%', 'ie 8']}),
    mqpacker(),
    cssnano()
  ]
  return gulp.src('./src/estilos.css')
    //.pipe(sourcemaps.init())
    .pipe(postcss(processor))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream())
})

// Tarea para vigilar los cambios
gulp.task('watch', ()=>{
	gulp.watch('./src/*.css', ['css'])
  gulp.watch('./*.html').on('change', browserSync.reload)
	gulp.watch('./js/*.js').on('change', browserSync.reload)
})
gulp.task('default',['watch','serve'])