// const {src,dest,parallel,series,pipe,watch} = require('gulp');
const gulp = require('gulp');
function defaulTask(cd){
    console.log('任务执行了');
    cd() // cd用来终止任务
};

function copyHtml(){
    return src('src/index.html').pipe(dest('dist'));
};

function copyJs(){
    return src('src/*.js').pipe(dest('dist/js'))
};

function copyCss(){
    return src('[abc].css').pipe(dest('dist/css'))
}

exports.default = defaulTask;
exports.copyHtml = copyHtml;
exports.copyJs = copyJs;
exports.copyCss = copyCss;