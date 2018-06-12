/**
 * 文件日志类对外接口 init ,log ,destory
 * author: lantao.wang
 */
'use strict';
var util = require('./util.js');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

class FileLogger{
    init(cfg) {
        this._createDir(cfg.path);
        this._createStream(cfg.type);
    }

    _createDir(path){
        if(!path){
            throw new Error('you should set path parameter for file logger!');
        }
        mkdirp.sync(path);
        this._path = path;
    }

    _createStream(preFix){
        this.preFix = preFix;
        this._curDate = util.curDateStr('YYYY-mm-dd');
        this._stream = fs.createWriteStream([this._path,"/",util.curDateStr('YYYY-mm-dd'),"-",preFix,'.log'].join(''),{flags:'a'});
    }

    log(level,timePreFix,msg){
        this._updateStream();
        this._stream.write([timePreFix,msg,'\r\n'].join(' '));
    }
    _updateStream(){
        if(this._curDate !== util.curDateStr('YYYY-mm-dd')){
            this._createStream(this.preFix);
        }
    }
    _closeStream(){
        this._stream.close();
    }
    destroy(){
        this._stream&&this._stream.close();
    }
}


exports.FileLogger = FileLogger;
