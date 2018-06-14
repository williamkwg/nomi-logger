/**
 * 日志收集类有收集指定等级到指定目录的左用
 * author: lantao.wang
 */

var levels = require('./Level.js');
var Terminal = require('./Terminals.js').Terminal;

class LogCollector{
    constructor(cfg){
        this.level = levels.toInt(cfg.level.toUpperCase())||levels.WARN;
        this.terminals = new Terminal(cfg.terminals||['file']);
        this.terminals.init(cfg);
    }
    getLevel(){
        return this.level;
    }
    destroy(){
        this.terminals.destroy();
    }
    log(actLevel){
        if(this.level<=actLevel){
            this.terminals.log.apply(this.terminals,arguments);
        }
    }
}


exports.LogCollector = LogCollector;

