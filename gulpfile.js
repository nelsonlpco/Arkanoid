var gulp = require("gulp"),
    ts = require("gulp-typescript"),
    jade = require("gulp-jade"),
    sass = require("gulp-sass")

gulp.task("ts-build", function () {
    gulp.src("./src/ts/game.ts")
        .pipe(ts({
            noImplicitAny: true,
            out: 'game.js'
        }))
        .pipe(gulp.dest('build/js'));
});

gulp.task("sass-build", function(){
    gulp.src("./src/sass/arkanoid.scss")
    .pipe(sass())
    .pipe(gulp.dest('./build/css'));

});

gulp.task("jade-build", function () {
    gulp.src("./src/index.jade")
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest("./build/"));
});

gulp.task("build", ["ts-build","sass-build","jade-build"]);