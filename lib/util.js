/**
 * 工具类，导出常用的方法
 * author: lantao.wang
 */

function each(a,cb){
    for(let i=0,l = a.length;i<l;i++){
        if(cb(a[i],i)===false){
            break;
        }
    }
}

function getType(o){
    return Object.prototype.toString.apply(o);
}

function isError(type){
    return type==='[object Error]';
}

function isObjectOrArray(type){
    return type==='[object Object]'||type==='[object Array]';
}

//将费字符串转换为字符串
function toString(o){

    let type = getType(o);

    if(isObjectOrArray(type)){

        return JSON.stringify(o);

    }else if(isError(type)){

        return o.stack||"";

    }else{

        return o;

    }
}

//将参数填充到msg模板
function assignPattern(msg,paras){
    //change msg to string
    var ma;
    if(getType(msg)==='[object String]'){
        ma = msg.split(/\{\s*\}/gi);
    }else{
        ma = [toString(msg)];
    }

    //set paras to string pattern
    var res = [],l = Math.max(ma.length,paras.length);
    for(var i=0;i<l;i++){
        if(ma.length>i){
            res.push(ma[i]);
        }
        if(paras.length>i){
            res.push(toString(paras[i]));
        }else if(i+1<l){
            res.push("{}");
        }
    }

    //return result
    return res.join(' ');
}


function toArray(str,reg){
    return str.split(reg);
}


function to2Bit(n) {
    return [0,n].join('').slice(-2);
}
function toDateStr(d,format) {
    if (!format) return d;
    format = format.replace(/Y+/i, d.getFullYear());
    format = format.replace(/m+/i, to2Bit(d.getMonth() + 1));
    format = format.replace(/d+/i, to2Bit(d.getDate()));
    format = format.replace(/H+/i, to2Bit(d.getHours()));
    format = format.replace(/i+/i, to2Bit(d.getMinutes()));
    format = format.replace(/s+/i, to2Bit(d.getSeconds()));
    format = format.replace(/ms/i, d.getMilliseconds());
    return format;
}


function curDateStr(format){
    format = format||'YYYY-mm-dd H:i:s.ms';
    return toDateStr(new Date(),format);
}


function forEach(o,cb){
    for(let i in o){
        if(o.hasOwnProperty(i)){
            if(cb(o[i],i)===false){
                break;
            }
        }
    }
}
//当前日期字符串，支持format
exports.curDateStr = curDateStr;

//将文本中的占位符替换成变量
exports.assignPattern = assignPattern;

//遍历
exports.each = each;

//遍历
exports.forEach = forEach;



