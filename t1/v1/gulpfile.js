const fs = require("fs");
const path = require("path");

const gulp = require("gulp");
const data = require("gulp-data");
const del = require("del");
const nunjucksRender = require("gulp-nunjucks-render");

const src = "src/"
const dest = "public";
const sharedTemplates = "src/shared/templates";

gulp.task("clean", () => {
    return del(`${dest}/**`, {
        force: true
    });
});

const getContext = file => {
    const ctx = `${path.dirname(file.path)}/ctx.json`;
    if (fs.existsSync(ctx)) {
        return JSON.parse(fs.readFileSync(ctx));
    } else {
        console.log("No context file at:", ctx)
        return {};
    }
};

gulp.task("html", () => {
    return gulp.src(`${src}**/index.njk`)
        .pipe(data(getContext))
        .pipe(nunjucksRender({
            path: sharedTemplates,
            envOptions: {
                trimBlocks: true,
                lstripBlocks: true,
                noCache: true
            }
        }))
        .pipe(gulp.dest(dest));
});

gulp.task("js", () => {
    return gulp.src(`${src}**/*.js`)
        .pipe(gulp.dest(dest));
});

gulp.task("css", () => {
    return gulp.src(`${src}**/*.css`)
        .pipe(gulp.dest(dest));
});

gulp.task("build",
    gulp.series(
        "clean",
        gulp.parallel(
            "html",
            "css",
            "js"
        )
    )
);