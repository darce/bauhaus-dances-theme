const gulp = require('gulp')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const minifyCSS = require('gulp-clean-css')

gulp.task('js', function () {
    return gulp.src([
        'js/rellax.min.js',
        'js/rellax-init.js',
        'js/navigation.js',
        'js/video-homepage.js'
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
})

gulp.task('css', function () {
    return gulp.src('css/*.css')
        .pipe(concat('styles.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('build/css'))
})

gulp.task('default', gulp.series('js', 'css'));