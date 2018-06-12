/**
 * 终端类，代表一组日志终端，目前包含file，console，如要扩充需要实现日志接口并植入Terminal初始化方法
 * author: lantao.wang
 */

var FileLogger = require('./File.js').FileLogger;
var consl = require('./Console.js');
var levels = require('./Level.js');
var util = require('./util.js');

//日志前缀：datestr-日志等级
function caluPrefix(level){
    return [util.curDateStr(),levels.toStr(level)].join(' ');
}

//批量执行日志中的方法
function arrayExec(a,method,args){
    util.each(a,function(e){
        if(e[method]&&typeof e[method]==='function'){
            e[method].apply(e,args);
        }
    });
}

const terminalMap = {
    file:function(){
        return new FileLogger();
    },
    console:function(){
        return consl;
    }
}

function getDevice(t){
    var res = terminalMap[t];
    if(res){
        return res();
    }else{
        return null;
    }
}

//终端类，维护一个各终端的列表
class Terminal{
    constructor(ts) {
        ts = ts||['file','console'];
        let cs = this.des = [];
        util.each(ts,function(e){
            let ct = getDevice(e);
            ct&&cs.push(ct);
        });
    }

    init(){
        arrayExec(this.des,'init',arguments);
    }

    log(level,msg){
        let preFix = caluPrefix(level);
        let cmsg = util.assignPattern(msg,Array.prototype.slice.call(arguments,2));
        arrayExec(this.des,'log',[level,preFix,cmsg]);
    }

    destroy(){
        arrayExec(this.des,'destroy',arguments);
    }
}

exports.Terminal = Terminal;
