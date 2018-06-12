/**
 * 日志wrapper，封装了system和user 日志实例,可以直接引用使用。
 * author: lantao.wang
 */



//['ALL','DEBUG','INFO','WARN','ERROR']
var Logger = require('./Logger.js').Logger;
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
        types = ['user','system'];
    for(let i=0,l=types.length;i<l;i++){
        c = cfg[types[i]];
        if(c){
            intstances[a[i]] = new Logger({level:c.level||'INFO',path:c.path||'',type:types[i]});
        }
    }
};

