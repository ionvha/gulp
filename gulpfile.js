const {src,pipe,dest,series,parallel,watch  } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer'); 
const rename = require('gulp-rename')
const browserSync = require('browser-sync');
const babel = require('gulp-babel')
const uglify = require('gulp-uglify');
const del = require('del')
const htmlmin = require('gulp-htmlmin')
const cssmin = require('gulp-cssmin');

function html(){
    return src('./src/index.html')
            .pipe(htmlmin({collapseWhitespace:true})) // 处理HTML的空格
            .pipe(dest('./dist'));
}

function css(){
    return src('./src/*.scss')
        .pipe(sass()) 
        .pipe(autoprefixer({
            browsers: ['last 2 versions'] // 兼容后面两个版本
        }))
        .pipe(cssmin()) 
        .pipe(rename({
            suffix: '.min' // 添加后缀
        }))
        .pipe(dest('./dist'))
        .pipe(browserSync.stream())
}

function js(){
    return src('./src/*.js')
        .pipe(babel({
            presets: ['@babel/preset-env'] // 
        }))
        .pipe( uglify())
        .pipe(dest('./dist'))
}

function Delete(){
    return del('./dist')
}

function monitor(){
    browserSync.init({
        server:'./dist' // 启动一个disk为网站根目录的服务器
    })
    watch('./src/*.scss',css);
    watch('./src/*.js',js);
    watch('./src/index.html',html).on('change',browserSync.reload)
}

exports.exjs = js;
exports.excss = css;
exports.exhtml = html;
exports.Delete = Delete;
exports.monitor = monitor;
exports.exploit = parallel(html,css,js,monitor);
exports.production = series(Delete, parallel(html,js,css))