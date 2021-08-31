import { IFsLogger } from '../types';
/**
 * @function 时间戳转时间
 * @author eleven
 * @param {number} val 传入的时间挫
 * @param {string} type 需要转换的类型  YYYY-MM-DD ： 只需要日期 ； YYYY-MM-DD HH:MM:SS ： 日期加时分秒；YYYY-MM-DD HH:MM:SS ： 日期加时分秒
 * 如只需要如期，则startNum ： 0 ， endNum ： 10
 */
export declare function transitionTimestamp(val: any, type: string): string | undefined;
/**
 * @function: 执行data函数
 * @author: guoxt
 * @param {Function} data
 * @param {IFsLogger} context
 * @return {*}
 */
export declare function getData(data: Function, context: IFsLogger): any;
/**
 * @function: 判断是否为对象
 * @author: guoxt
 * @param {any} obj
 * @return {*}
 */
export declare function isPlainObject(obj: any): boolean;
/**
 * @function: console报错
 * @author: guoxt
 * @param {any} msg
 * @return {*}
 */
export declare function handleWarn(msg: any): void;
/**
 * @function: console报错
 * @author: guoxt
 * @param {any} err
 * @param {string} info
 * @return {*}
 */
export declare function handleError(err: any, info?: string): void;
