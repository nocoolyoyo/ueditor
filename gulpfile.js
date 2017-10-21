/**
 * Created by nocoolyoyo on 2017/10/12.
 */
const fs = require('fs');
const gulp = require('gulp');
const sass = require('gulp-sass');
const webserver = require('gulp-webserver');
const plumber = require('gulp-plumber');
const theme = "default";
const examplePath = './';

let taskMap = [];

//根据taskMap自动构建gulptask任务
function makeTask () {
    let filesEntry =  fs.readdirSync(`./themes/${theme}/src/scss/outputEntry`);
    filesEntry.forEach( function (file){

        file = file.split(".");
        let baseName = file[0];
        let extName = file[1];
        if(extName === "scss")
            taskMap.push(baseName);
    });
    taskMap.forEach(function (value,index) {
        let taskChain = `gulp.task('${value}',function(){return gulp.src('./themes/${theme}/src/scss/outputEntry/${value}.scss')
                                   .pipe(plumber())
                                   .pipe(sass())
                                   .pipe(plumber.stop())
                                   .pipe(gulp.dest('./themes/${theme}/_css'))})`;
        eval(taskChain);
    });
}

makeTask();
gulp.task('makeTask', function () {
    makeTask();
});
gulp.task('build', taskMap);

//文件监听
gulp.task('watch', function(){
    // gulp.watch(`./themes/${theme}/src/scss/outputEntry/`, ['makeTask']);
    gulp.watch(`./themes/${theme}/src/scss/**/*.scss`, ['build']);
    // Other watchers
});

//启用服务器
gulp.task('server', function(){
    gulp.src(examplePath).pipe(webserver({
        port: 8099,//端口
        liveload: true,//实时刷新代码。不用f5刷新
        open: true, // 服务器启动时自动打开网页
        directoryListing: {
            path: examplePath,
            enable: true
        }}));
    // Other watchers
});
// // 输出全部文章文件
gulp.task('sass', ['build', 'watch','server']);
// gulp.task('test', ['makeTask']);
