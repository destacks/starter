const gulp = require("gulp");
const nunjucksRender = require("gulp-nunjucks-render");

const src = "src/"
const dest = "public";

gulp.task("html", function () {
    return gulp.src(`${src}**/index.njk`)
        .pipe(nunjucksRender({
            path: `${src}`
        }))
        .pipe(gulp.dest(dest));
});

gulp.task("js", function () {
    return gulp.src(`${src}**/*.js`)
        .pipe(gulp.dest(dest));
});

gulp.task("css", function () {
    return gulp.src(`${src}**/*.css`)
        .pipe(gulp.dest(dest));
});

gulp.task("build", gulp.parallel(
    "css",
    "html",
    "js"
));

module.exports = gulp;