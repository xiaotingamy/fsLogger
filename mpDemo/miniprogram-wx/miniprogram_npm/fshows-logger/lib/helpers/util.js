"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.handleWarn = exports.isPlainObject = exports.getData = exports.transitionTimestamp = void 0;
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
exports.transitionTimestamp = transitionTimestamp;
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
exports.getData = getData;
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
exports.isPlainObject = isPlainObject;
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
exports.handleWarn = handleWarn;
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
exports.handleError = handleError;
//# sourceMappingURL=util.js.map