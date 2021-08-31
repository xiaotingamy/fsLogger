(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('axios')) :
    typeof define === 'function' && define.amd ? define(['axios'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.fslogger = factory(global.axios));
}(this, (function (axios) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    /**
     * @function 时间戳转时间
     * @author eleven
     * @param {number} val 传入的时间挫
     * @param {string} type 需要转换的类型  YYYY-MM-DD ： 只需要日期 ； YYYY-MM-DD HH:MM:SS ： 日期加时分秒；YYYY-MM-DD HH:MM:SS ： 日期加时分秒
     * 如只需要如期，则startNum ： 0 ， endNum ： 10
     */
    function transitionTimestamp(val, type) {
        val = val.length < 13 ? val * 1000 : val * 1; // 当不是毫秒时候，转换为毫秒
        var date = new Date(val);
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        var hour = ("0" + date.getHours() * 1).slice(-2);
        var minute = ("0" + date.getMinutes() * 1).slice(-2);
        var second = ("0" + date.getSeconds() * 1).slice(-2);
        var millisecond = ("00" + date.getMilliseconds() * 1).slice(-3);
        switch (type) {
            case 'YYYY-MM-DD':
                return year + '-' + month + '-' + day;
            case 'YYYY-MM-DD HH:MM:SS':
                return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
            case 'YYYY-MM-DD HH:MM':
                return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
            case 'HH:MM:SS':
                return hour + ':' + minute + ':' + second;
            case 'YYYY-MM-DD HH:MM:SS.ss':
                return (year +
                    '-' +
                    month +
                    '-' +
                    day +
                    ' ' +
                    hour +
                    ':' +
                    minute +
                    ':' +
                    second +
                    ',' +
                    millisecond);
            case 'MM-DD HH:MM':
                return month + '-' + day + ' ' + hour + ':' + minute;
        }
    }
    /**
     * @function: 执行data函数
     * @author: guoxt
     * @param {Function} data
     * @param {IFsLogger} context
     * @return {*}
     */
    function getData(data, context) {
        try {
            return data.call(context);
        }
        catch (e) {
            handleError(e, "data()");
            return {};
        }
    }
    var _toString = Object.prototype.toString;
    /**
     * @function: 判断是否为对象
     * @author: guoxt
     * @param {any} obj
     * @return {*}
     */
    function isPlainObject(obj) {
        return _toString.call(obj) === '[object Object]';
    }
    /**
     * @function: console报错
     * @author: guoxt
     * @param {any} msg
     * @return {*}
     */
    function handleWarn(msg) {
        if (typeof console !== 'undefined') {
            console.error("[FsLogger warn]: " + msg);
        }
    }
    /**
     * @function: console报错
     * @author: guoxt
     * @param {any} err
     * @param {string} info
     * @return {*}
     */
    function handleError(err, info) {
        handleWarn("Error in " + info + ": \"" + err.toString() + "\"");
        if (typeof console !== 'undefined') {
            console.error(err);
        }
        else {
            throw err;
        }
    }

    var inBrowser = typeof window !== 'undefined';
    var inWx = typeof wx !== 'undefined' && !!wx.getSystemInfoSync();
    var inMy = typeof my !== 'undefined' && !!my.getSystemInfoSync();

    var PromiseLimit = /** @class */ (function () {
        function PromiseLimit(limit) {
            this.limit = limit || 2;
            this.blockQueue = [];
            this.currentReqNumber = 0;
            this.isCancel = false;
        }
        PromiseLimit.prototype.call = function (req) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!req) {
                                throw new Error('req is required.');
                            }
                            if (Object.prototype.toString.call(req) !== '[object Function]') {
                                throw new Error('Req must be a function.');
                            }
                            if (this.isCancel)
                                return [2 /*return*/];
                            if (!(this.currentReqNumber >= this.limit)) return [3 /*break*/, 2];
                            // 阻塞队列增加一个 Pending 状态的 Promise
                            return [4 /*yield*/, new Promise(function (resolve) { return _this.blockQueue.push(resolve); })];
                        case 1:
                            // 阻塞队列增加一个 Pending 状态的 Promise
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/, this._handlerReq(req, args)];
                    }
                });
            });
        };
        PromiseLimit.prototype._handlerReq = function (req, args) {
            return __awaiter(this, void 0, void 0, function () {
                var err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.currentReqNumber++;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, req.apply(void 0, args)];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3:
                            err_1 = _a.sent();
                            return [2 /*return*/, Promise.reject(err_1)];
                        case 4:
                            this.currentReqNumber--;
                            if (this.blockQueue.length) {
                                this.blockQueue[0]();
                                this.blockQueue.shift();
                            }
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        PromiseLimit.prototype.cancel = function () {
            this.blockQueue = [];
            this.currentReqNumber = 0;
            this.isCancel = true;
        };
        return PromiseLimit;
    }());

    var limitP = new PromiseLimit(1);
    var DEFAULT_INFO = {
        AppId: 'fs-logger-default',
        Level: 'INFO',
        Content: ''
    };
    console.log(inBrowser, inWx, inMy, '***env***');
    var FsLogger = /** @class */ (function () {
        function FsLogger(initConfig) {
            this.defaults = initConfig;
            if (!this.defaults.url) {
                handleWarn('defaults options url must not be empty');
            }
            initDefaultInfo();
            this.sendInfo = DEFAULT_INFO;
            this.requestOptions = {
                url: initConfig.url,
                method: 'POST',
                data: DEFAULT_INFO,
                timeout: initConfig.timeout || 5000
            };
        }
        FsLogger.prototype._logByEnv = function (level, content) {
            if (inWx) {
                return limitP.call(this.wxRequestHttpLog, level, content, this);
            }
            else if (inMy) {
                return limitP.call(this.myRequestHttpLog, level, content, this);
            }
            else {
                return limitP.call(this.axiosHttpLog, level, content, this);
            }
        };
        FsLogger.prototype.log = function (level, content) {
            return this._logByEnv(level, content);
        };
        FsLogger.prototype.info = function (content) {
            return this._logByEnv('info', content);
        };
        FsLogger.prototype.warn = function (content) {
            return this._logByEnv('warn', content);
        };
        FsLogger.prototype.error = function (content) {
            return this._logByEnv('error', content);
        };
        FsLogger.prototype.axiosHttpLog = function (level, content, context) {
            return new Promise(function (resolve, reject) {
                var sendInfo = generateSendInfo(context, level, content);
                axios__default['default'](__assign(__assign({}, context.requestOptions), { headers: {
                        'content-type': 'application/json;charset=utf-8'
                    }, data: sendInfo }))
                    .then(function (res) {
                    resolve(res);
                })
                    .catch(function (err) {
                    reject(err);
                });
            });
        };
        FsLogger.prototype.myRequestHttpLog = function (level, content, context) {
            return new Promise(function (resolve, reject) {
                var sendInfo = generateSendInfo(context, level, content);
                my.request(__assign(__assign({}, context.requestOptions), { headers: {
                        'content-type': 'application/json;charset=utf-8'
                    }, data: sendInfo, dataType: 'json', success: function (res) {
                        resolve(res);
                    }, fail: function (err) {
                        reject(err);
                    } }));
            });
        };
        FsLogger.prototype.wxRequestHttpLog = function (level, content, context) {
            return new Promise(function (resolve, reject) {
                var sendInfo = generateSendInfo(context, level, content);
                wx.request(__assign(__assign({}, context.requestOptions), { header: {
                        'content-type': 'application/json;charset=utf-8'
                    }, data: sendInfo, dataType: 'json', success: function (res) {
                        resolve(res);
                    }, fail: function (err) {
                        reject(err);
                    } }));
            });
        };
        /**
         * @function: 修改日志上报内容的基本字段
         * @author: guoxt
         * @param {ISendInfo} info
         * @return {*}
         */
        FsLogger.prototype.updateInfo = function (info) {
            this.sendInfo = __assign(__assign({}, this.sendInfo), info);
        };
        return FsLogger;
    }());
    /**
     * @function: 根据使用场景初始化上报内容基础字段：小程序增加SystemInfo  浏览器平台增加UserAgent字段
     * @author: guoxt
     * @param {IFsLoggerConfig} config
     * @return {*}
     */
    function initDefaultInfo() {
        if (!DEFAULT_INFO.SystemInfo && !inBrowser) {
            try {
                var info = inWx ? wx.getSystemInfoSync() : inMy ? my.getSystemInfoSync() : {};
                DEFAULT_INFO.SystemInfo = JSON.stringify(info);
            }
            catch (e) {
                handleError(e, 'initDefaultInfo()');
                throw e;
            }
        }
        if (!DEFAULT_INFO.UserAgent && inBrowser) {
            DEFAULT_INFO.UserAgent = window.navigator.userAgent;
        }
    }
    /**
     * @function: 生成完整上报字段
     * @author: guoxt
     * @param {IFsLogger} context
     * @param {string} level
     * @param {string} content
     * @return {*}
     */
    function generateSendInfo(context, level, content) {
        var data = context.defaults.data;
        data = typeof data === 'function' ? getData(data, context) : data || {};
        if (!isPlainObject(data)) {
            data = {};
            handleWarn('data functions should return an object');
        }
        if (content && typeof content !== 'string') {
            content = JSON.stringify(content);
        }
        var timestamp = transitionTimestamp(new Date().getTime(), 'YYYY-MM-DD HH:MM:SS.ss');
        var sendInfo = __assign(__assign(__assign({}, context.sendInfo), data), { Level: level ? level.toUpperCase() : 'INFO', Content: content || '', LocalMachineTime: timestamp });
        return sendInfo;
    }

    return FsLogger;

})));
//# sourceMappingURL=index.js.map
