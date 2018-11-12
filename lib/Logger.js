/**
 * 日志类，依赖分级模块和终端类
 * author: lantao.wang
 */

const levels = require('./Level.js');
const util = require('./util.js');
const Terminal = require('./Terminals.js').Terminal;

function processArgs(level,args){
    return [level].concat(Array.prototype.slice.call(args,0));
}

//代理终端日志的调用
function log(terminals,collectors,curLevel,actLevel,args){
    if(curLevel<=actLevel){
        terminals.log.apply(terminals,processArgs(actLevel,args));
    }
    //if there is collectors
    if(collectors[actLevel]&&collectors[actLevel].length){
        dispath(collectors[actLevel],processArgs(actLevel,args))
    }
}

//dispath log to collectors
function dispath(collectors,args){
    util.each(collectors,function(c){
        c.log.apply(c,args);
    })
}


class Logger{
    constructor(cfg){
        this.level = levels.toInt(cfg.level.toUpperCase())||levels.ALL;
        this.terminals = new Terminal(cfg.terminals||['file','console']);
        this.terminals.init(cfg);
        this.collectors = [];
    }
    destroy(){
        this.terminals.destroy();
    }
    DEBUG(){
        log(this.terminals,this.collectors,this.level,levels.DEBUG,arguments);
    }
    INFO(){
        log(this.terminals,this.collectors,this.level,levels.INFO,arguments);
    }
    WARN(){
        log(this.terminals,this.collectors,this.level,levels.WARN,arguments);
    }
    ERROR(){
        log(this.terminals,this.collectors,this.level,levels.ERROR,arguments);
    }
    bindCollectors(colletors){
        var cs = this.collectors;
        util.each(colletors||[],function(e){

            for(let i=e.getLevel();i<=levels.ERROR;i++){
                if(!cs[i]){
                    cs[i] = [];
                }
                cs[i].push(e);
            }
        });
    }
}


exports.Logger = Logger;

