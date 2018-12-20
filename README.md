## Installation

```bash
$ npm install nomi-logger --save
```

Node.js >= 8.0.0  required.

## API

### property

- Logger
- SysLogger

### function

- init
- newInstance

## Usage

#### demo1: the usage of init api.

``` javascript

const LoggerWrapper = require('nomi-logger');

LoggerWrapper.init({
    system:{path:'d:/testlog1/system/',level:'DEBUG'},
    user:{path:'d:/testlog1/user/',level:'WARN'},
    error:{path:'d:/error/user/',level:'WARN'}
});

const { Logger, SysLogger } = LoggerWrapper;

 ```

#### demo2: the usage of SysLogger and Logger property.

``` javascript

const LoggerWrapper = require('nomi-logger').init({
    system:{path:'d:/testlog1/system/',level:'DEBUG'},
    user:{path:'d:/testlog1/user/',level:'WARN'},
    error:{path:'d:/error/user/',level:'WARN'}
});

const { Logger, SysLogger } = LoggerWrapper;

Logger.DEBUG("{} date is {},paras is = {},\n error is={},\n other:{}",new Date(),{a:3,b:'b',m:3}, new Error("error"));
Logger.INFO("{} date is {},paras is = {},\n error is={},\n other:{}",new Date(),{a:3,b:'b',m:4},new Error("error"));
SysLogger.WARN("{} date is {},paras is = {},\n error is={},\n other:{}",new Date(),{a:3,b:'b',m:5},new Error("error"), "other info");
SysLogger.ERROR("{} date is {},paras is = {},\n error is={},\n other:{}",new Date(),{a:3,b:'b',m:6},new Error("error"), 23, 322, 333);

```

#### demo3: use newInstance api to the custom log service

``` javascript

/**
 * customLogger: {
 *      DEBUG: Function,
 *      INFO: Function,
 *      WARN: Function,
 *      ERROR: Function
 * }
 */
const customLogger = LoggerWrapper.newInstance({path:'d:/testlog1/request/',level:'ALL'});

customLogger.DEBUG("{} date is {},paras is = {},\n error is={},\n other:{}",new Date(),{a:3,b:'b',m:3}, new Error("error"));
customLogger.INFO("{} date is {},paras is = {},\n error is={},\n other:{}",new Date(),{a:3,b:'b',m:4},new Error("error"));
customLogger.WARN("{} date is {},paras is = {},\n error is={},\n other:{}",new Date(),{a:3,b:'b',m:5},new Error("error"), "other info");
customLogger.ERROR("{} date is {},paras is = {},\n error is={},\n other:{}",new Date(),{a:3,b:'b',m:6},new Error("error"), 23, 322, 333);


```
