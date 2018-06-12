/**
 * 控制台日志模块
 * author: lantao.wang
 */
var levels = require('./level.js');
const chalk = require('chalk');
const log = console.log;

exports.init = function () {
    log(chalk.green("the logger's console terminal has been inited!"));
};

exports.log = function(level,preFix,msg){
    msg = [preFix,msg].join(' ');
    if(level===levels.WARN){
        msg = chalk.yellow(msg);
    }else if(level===levels.ERROR){
        msg = chalk.red(msg);
    }
    log(msg);
};

exports.destroy = function(level,preFix,msg){
    log(chalk.red("the logger's console terminal has been destroied!"));
};