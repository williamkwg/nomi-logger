/**
 * 日志分级模块
 * author: lantao.wang
 */

var mapStr = ['ALL','DEBUG','INFO','WARN','ERROR'];
var mapInt = {};
(function(){
    for(var i=0;i<mapStr.length;i++){
        mapInt[mapStr[i]] = i;
    }
})();

exports.ALL = 0
exports.DEBUG = 1;
exports.INFO = 2;
exports.WARN = 3;
exports.ERROR = 4;
exports.toStr = function(i){
    return mapStr[i]||'NONE';
};

exports.toInt = function(str){
    return mapInt[str]||0;
};