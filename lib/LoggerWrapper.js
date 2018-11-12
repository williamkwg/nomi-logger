/**
 * 日志wrapper，封装了system和user 日志实例,可以直接引用使用。
 * author: lantao.wang
 */



//['ALL','DEBUG','INFO','WARN','ERROR']
var Logger = require('./Logger.js').Logger;
var LogCollector = require('./LogCollector.js').LogCollector;
var util = require('./util.js');
const intstances ={
    userLogger:null,
    sysLogger:null
};

//user logger
Object.defineProperty(exports, 'Logger', {
    configurable : false,
    enumerable : true,
    get: function() {
        return intstances.userLogger;
    }
});

//system logger
Object.defineProperty(exports, 'SysLogger', {
    configurable : true,
    enumerable : true,
    get: function() {
        return intstances.sysLogger;
    }
});


//初始化方法，可以通过{user：{path:'',level:'INFO'}，system:{path:'',level:'INFO'}} 初始化系统及用户日志
exports.init =  function(cfg){
    var c=null,
        a = ['userLogger','sysLogger'],
        types = ['user','system'],
        typeMap = {user:true,system:true},
        collectors = [];

    //collectors
    util.forEach(cfg,function(e,key){
        if(!typeMap[key]){
            collectors.push(new LogCollector({
                level:e.level||'WARN',
                path:e.path||'',
                type:e.type||key
            }));
        }
    });

    //loggers bind collectors
    util.each(a,function(e,i){
        c = cfg[types[i]];
        if(c){
            let lg =  new Logger({
                level:c.level||'INFO',
                path:c.path||'',
                type:types[i]
            });
            lg.bindCollectors(collectors);
            intstances[a[i]] = lg;
        }
    });



};


//新建日志实例可以指定 level , path ,terminals
exports.newInstance =  function(c){
    return new Logger({level:c.level||'INFO',path:c.path||'',type:''||c.type,termials:c.terminals});
};

