import { IFsLogger } from '../types'

/**
 * @function 时间戳转时间
 * @author eleven
 * @param {number} val 传入的时间挫
 * @param {string} type 需要转换的类型  YYYY-MM-DD ： 只需要日期 ； YYYY-MM-DD HH:MM:SS ： 日期加时分秒；YYYY-MM-DD HH:MM:SS ： 日期加时分秒
 * 如只需要如期，则startNum ： 0 ， endNum ： 10
 */
export function transitionTimestamp(val: any, type: string) {
  val = val.length < 13 ? val * 1000 : val * 1 // 当不是毫秒时候，转换为毫秒
  let date = new Date(val)
  let year = date.getFullYear()
  let month = `0${date.getMonth() + 1}`.slice(-2)
  let day = `0${date.getDate()}`.slice(-2)
  let hour = `0${date.getHours() * 1}`.slice(-2)
  let minute = `0${date.getMinutes() * 1}`.slice(-2)
  let second = `0${date.getSeconds() * 1}`.slice(-2)
  let millisecond = `00${date.getMilliseconds() * 1}`.slice(-3)

  switch (type) {
    case 'YYYY-MM-DD':
      return year + '-' + month + '-' + day
    case 'YYYY-MM-DD HH:MM:SS':
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    case 'YYYY-MM-DD HH:MM':
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    case 'HH:MM:SS':
      return hour + ':' + minute + ':' + second
    case 'YYYY-MM-DD HH:MM:SS.ss':
      return (
        year +
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
        millisecond
      )
    case 'MM-DD HH:MM':
      return month + '-' + day + ' ' + hour + ':' + minute
  }
}

/**
 * @function: 执行data函数
 * @author: guoxt
 * @param {Function} data
 * @param {IFsLogger} context
 * @return {*}
 */
export function getData(data: Function, context: IFsLogger): any {
  try {
    return data.call(context)
  } catch (e) {
    handleError(e, `data()`)
    return {}
  }
}

const _toString = Object.prototype.toString
/**
 * @function: 判断是否为对象
 * @author: guoxt
 * @param {any} obj
 * @return {*}
 */
export function isPlainObject(obj: any): boolean {
  return _toString.call(obj) === '[object Object]'
}

/**
 * @function: console报错
 * @author: guoxt
 * @param {any} msg
 * @return {*}
 */
export function handleWarn(msg: any): void {
  if (typeof console !== 'undefined') {
    console.error(`[FsLogger warn]: ${msg}`)
  }
}

/**
 * @function: console报错
 * @author: guoxt
 * @param {any} err
 * @param {string} info
 * @return {*}
 */
export function handleError(err: any, info?: string): void {
  handleWarn(`Error in ${info}: "${err.toString()}"`)
  if (typeof console !== 'undefined') {
    console.error(err)
  } else {
    throw err
  }
}
