var gulp = require('gulp')
var sass = require('gulp-sass')
var cleanCss = require('gulp-clean-css')
var sourcemaps = require('gulp-sourcemaps')
var browserSync = require('browser-sync').create();
var imagemin = require("gulp-imagemin")


sass.compiler = require('node-sass')

gulp.task("sass", function () {
    //we want to run "sass css/app.scss app.css --watch"
    return gulp.src("src/css/app.scss")
        //creats the sourcemap
        .pipe(sourcemaps.init())

        //compiles the sass
        .pipe(sass())

        //minifies the css file
        .pipe(
            cleanCss({
                compatibility: "ie8"
            })
        )

        //writes the lines that the original css was on
        .pipe(sourcemaps.write())

        //creates the css file
        .pipe(gulp.dest("dist"))

        //reload the browser
        .pipe(browserSync.stream())

})

gulp.task("html", function () {
    //find the file named index.html
    return gulp.src("src/*.html")
        //copy it into the dist folder
        .pipe(gulp.dest("dist"))
})

gulp.task("fonts", function () {
    return gulp.src("src/fonts/*")
        //copy all fonts into the dist folder
        .pipe(gulp.dest("dist/fonts"))
})

gulp.task("images", function () {
    return gulp.src("src/img/*")
        //minify all the images
        .pipe(imagemin())
        //copy all images into the dist folder
        .pipe(gulp.dest("dist/img"))
})

function reload() {
    browserSync.reload();
}

gulp.task("watch", function () {

    browserSync.init({
        server: {
            baseDir: "dist",
        }
    })
    gulp.watch("src/*.html", gulp.series("html")).on('change', browserSync.reload);
    gulp.watch("src/css/app.scss", gulp.series("sass"))
    gulp.watch("src/fonts/*", gulp.series('fonts'))
    gulp.watch("src/img/*", gulp.series('images'))
})



gulp.task("default", gulp.series("html", "sass", "fonts", "images", "watch"))