var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    plugin = require('gulp-load-plugins')();


gulp.task('defaults',function(){

    console.log("My first gulp task");
});

gulp.task('css',function(){
    return gulp.src(['./src/sass/style.scss'])
        .pipe(plugin.sourcemaps.init())
        .pipe(plugin.sass().on('error', plugin.sass.logError))
        .pipe(plugin.cssmin())
        .pipe(plugin.autoprefixer())
        .pipe(plugin.sourcemaps.write())
        .pipe(gulp.dest('./dest/css'))
        .pipe(browserSync.stream());
});

gulp.task('js',function(){
    return gulp.src([
        './node_modules/jquery/dist/jquery.min.js',
        './src/js/admin.js',
        './src/js/user.js'
    ]).pipe(plugin.babel({
            presets: ['es2015']
        }))
        .pipe(plugin.concat('all.js'))
        .pipe(plugin.uglify())
        .pipe(gulp.dest('./dest/js'))
        .pipe(browserSync.stream());
});

gulp.task('watch',function(){
    gulp.watch(['./src/sass/*.scss'],['css']);
    gulp.watch(['./src/js/*.js'],['js']);
});

gulp.task('serve',function(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('*.html').on('change',browserSync.reload);
})

gulp.task('default',['css','js','watch','serve']);
