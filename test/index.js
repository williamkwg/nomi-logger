var LoggerWrapper = require('../lib/LoggerWrapper.js');
LoggerWrapper.init({
    system:{path:'d:/testlog1/system/',level:'DEBUG'},
    user:{path:'d:/testlog1/user/',level:'WARN'},
    error:{path:'d:/error/user/',level:'WARN'}
});
//var SYS = LoggerWrapper.SysLogger;
//var loge = LoggerWrapper.Logger;

 var rq = LoggerWrapper.newInstance({path:'d:/testlog1/request/',level:'ALL'});
rq.DEBUG("{} date is {},paras is = {},\nerror is={},\ndddkk:{}",new Date(),{a:3,b:'dddd',m:32344},new Error("ddssdddssd"));
rq.INFO("{} date is {},paras is = {},\nerror is={},\ndddkk:{}",new Date(),{a:3,b:'dddd',m:32344},new Error("ddssdddssd"));
rq.WARN("{} date is {},paras is = {},\nerror is={},\ndddkk:{}",new Date(),{a:3,b:'dddd',m:32344},new Error("ddssdddssd"));
rq.ERROR("{} date is {},paras is = {},\nerror is={},\ndddkk:{}",new Date(),{a:3,b:'dddd',m:32344},new Error("ddssdddssd"),23,322,333);

/*
SYS.DEBUG("{} date is {},paras is = {},\nerror is={},\ndddkk:{}",new Date(),{a:3,b:'dddd',m:32344},new Error("ddssdddssd"));
SYS.INFO("{} date is {},paras is = {},\nerror is={},\ndddkk:{}",new Date(),{a:3,b:'dddd',m:32344},new Error("ddssdddssd"));
SYS.WARN("{} date is {},paras is = {},\nerror is={},\ndddkk:{}",new Date(),{a:3,b:'dddd',m:32344},new Error("ddssdddssd"));
SYS.ERROR("{} date is {},paras is = {},\nerror is={},\ndddkk:{}",new Date(),{a:3,b:'dddd',m:32344},new Error("ddssdddssd"),23,322,333);
*/
