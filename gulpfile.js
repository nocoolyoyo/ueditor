/**
 * Created by nocoolyoyo on 2017/10/12.
 */

let gulp = require('gulp');
let sass = require('gulp-sass');
let theme = "default";
//输出最终编译版本stylesheet文件
gulp.task('build', function(){
    return gulp.src(`./themes/${theme}/src/scss/uibase.scss`)
            .pipe(sass()) // Using gulp-sass
            .pipe(gulp.dest(`./themes/${theme}/_css`))
});
//文件监听
gulp.task('watch', function(){
    gulp.watch(`./themes/${theme}/src/scss/**/*.scss`, ['build']);
    // Other watchers
});
// // 输出全部文章文件
gulp.task('sass', ['build', 'watch']);
