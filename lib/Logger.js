/**
 * 日志类，依赖分级模块和终端类
 * author: lantao.wang
 */

var levels = require('./Level.js');
var Terminal = require('./Terminals.js').Terminal;

function processArgs(level,args){
    return [level].concat(Array.prototype.slice.call(args,0));
}

//代理终端日志的调用
function log(terminals,curLevel,actLevel,args){
    if(curLevel<=actLevel){
        terminals.log.apply(terminals,processArgs(actLevel,args));
    }
}

class Logger{
    constructor(cfg){
        this.level = levels.toInt(cfg.level.toUpperCase())||levels.ALL;
        this.terminals = new Terminal(['file','console']);
        this.terminals.init(cfg);
    }
    destroy(){
        this.terminals.destroy();
    }
    DEBUG(){
        log(this.terminals,this.level,levels.DEBUG,arguments);
    }
    INFO(){
        log(this.terminals,this.level,levels.INFO,arguments);
    }
    WARN(){
        log(this.terminals,this.level,levels.WARN,arguments);
    }
    ERROR(){
        log(this.terminals,this.level,levels.ERROR,arguments);
    }
}


exports.Logger = Logger;

