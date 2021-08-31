"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var util_1 = require("../helpers/util");
var env_1 = require("../helpers/env");
var promiseLimit_1 = require("../helpers/promiseLimit");
var limitP = new promiseLimit_1.default(1);
var DEFAULT_INFO = {
    AppId: 'fs-logger-default',
    Level: 'INFO',
    Content: ''
};
console.log(env_1.inBrowser, env_1.inWx, env_1.inMy, '***env***');
var FsLogger = /** @class */ (function () {
    function FsLogger(initConfig) {
        this.defaults = initConfig;
        if (!this.defaults.url) {
            (0, util_1.handleWarn)('defaults options url must not be empty');
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
        if (env_1.inWx) {
            return limitP.call(this.wxRequestHttpLog, level, content, this);
        }
        else if (env_1.inMy) {
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
            (0, axios_1.default)(__assign(__assign({}, context.requestOptions), { headers: {
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
exports.default = FsLogger;
/**
 * @function: 根据使用场景初始化上报内容基础字段：小程序增加SystemInfo  浏览器平台增加UserAgent字段
 * @author: guoxt
 * @param {IFsLoggerConfig} config
 * @return {*}
 */
function initDefaultInfo() {
    if (!DEFAULT_INFO.SystemInfo && !env_1.inBrowser) {
        try {
            var info = env_1.inWx ? wx.getSystemInfoSync() : env_1.inMy ? my.getSystemInfoSync() : {};
            DEFAULT_INFO.SystemInfo = JSON.stringify(info);
        }
        catch (e) {
            (0, util_1.handleError)(e, 'initDefaultInfo()');
            throw e;
        }
    }
    if (!DEFAULT_INFO.UserAgent && env_1.inBrowser) {
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
    data = typeof data === 'function' ? (0, util_1.getData)(data, context) : data || {};
    if (!(0, util_1.isPlainObject)(data)) {
        data = {};
        (0, util_1.handleWarn)('data functions should return an object');
    }
    if (content && typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    var timestamp = (0, util_1.transitionTimestamp)(new Date().getTime(), 'YYYY-MM-DD HH:MM:SS.ss');
    var sendInfo = __assign(__assign(__assign({}, context.sendInfo), data), { Level: level ? level.toUpperCase() : 'INFO', Content: content || '', LocalMachineTime: timestamp });
    return sendInfo;
}
//# sourceMappingURL=FsLogger.js.map