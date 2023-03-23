import gulp from "gulp";
import pug from "gulp-pug";
import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
import cssMinify from "gulp-css-minify";
import rename from "gulp-rename";
import minify from "gulp-minify";
import imagemin from "gulp-imagemin";
import concat from "gulp-concat";

//compiling PUG files into HTML
gulp.task("compile-pug", async function () {
  gulp
    .src("template/src/Assets/pug/index.pug")
    .pipe(pug())
    .pipe(gulp.dest("template/dist/"));
});

//compiling SASS files into CSS
gulp.task("compile-sass", async function () {
  gulp
    .src("template/src/Assets/sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("template/dist/assets/css"));
});

//minifying css
gulp.task("minify-css", async function () {
  gulp
    .src("template/dist/assets/css/style.css")
    .pipe(cssMinify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("template/dist/assets/css/"));
});

//minify js
gulp.task("minify-js", async function () {
  gulp
    .src("template/dist/assets/js/script.js")
    .pipe(cssMinify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("template/dist/assets/js/"));
});

//minify images
gulp.task("minify-images", async function () {
  gulp
    .src("template/src/Assets/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("template/dist/assets/img/"));
});

//combining js files into one
gulp.task("concat-js", async function () {
  gulp
    .src("template/src/assets/js/*")
    .pipe(concat("script.js"))
    .pipe(gulp.dest("template/dist/assets/js/"));
});

//watch task
gulp.task("watch", async function () {
  gulp.watch("template/src/Assets/pug/index.pug", gulp.series("compile-pug"));
  gulp.watch("template/src/Assets/sass/*.scss", gulp.series("compile-sass"));
  gulp.watch("template/src/assets/js/*", gulp.series("concat-js"));
  gulp.watch("template/dist/assets/css/style.css", gulp.series("minify-css"));
  gulp.watch("template/dist/assets/js/script.js", gulp.series("minify-js"));
  gulp.watch("template/src/Assets/img/*", gulp.series("minify-images"));
});

//default task
gulp.task(
  "default",
  gulp.parallel(
    "compile-pug",
    "compile-sass",
    "concat-js",
    "minify-css",
    "minify-js",
    "minify-images",
    "watch"
  )
);
