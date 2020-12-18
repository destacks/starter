"use strict";

const fs = require("fs");
const path = require("path");

const browserify = require("browserify");
const buffer = require("vinyl-buffer");
const data = require("gulp-data");
const del = require("del");
const glob = require("glob");
const gulp = require("gulp");
var merge = require('merge-stream');
const nunjucksRender = require("gulp-nunjucks-render");
const sourceStream = require("vinyl-source-stream");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");

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
    const files = glob.sync(`${src}**/*.js`);
    return merge(files.map(function (file) {
        return browserify({
                entries: file
            })
            .bundle()
            .pipe(sourceStream(file.replace(/src\//, "")))
            .pipe(buffer())
            .pipe(sourcemaps.init({
                loadMaps: false
            }))
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(dest))
    }));
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