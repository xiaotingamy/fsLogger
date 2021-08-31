import { IFsLoggerConfig, ISendInfo, LoggerPromise, IFsLogger, IRequestOptions } from '../types'
import axios from 'axios'
import {
  transitionTimestamp,
  getData,
  isPlainObject,
  handleWarn,
  handleError
} from '../helpers/util'
import { inBrowser, inWx, inMy } from '../helpers/env'
import PromiseLimit from '../helpers/promiseLimit'
const limitP = new PromiseLimit(1)

const DEFAULT_INFO: ISendInfo = {
  AppId: 'fs-logger-default',
  Level: 'INFO',
  Content: ''
}
console.log(inBrowser, inWx, inMy, '***env***')
export default class FsLogger {
  defaults: IFsLoggerConfig
  sendInfo: ISendInfo
  requestOptions: IRequestOptions

  constructor(initConfig: IFsLoggerConfig) {
    this.defaults = initConfig
    if (!this.defaults.url) {
      handleWarn('defaults options url must not be empty')
    }

    initDefaultInfo()
    this.sendInfo = DEFAULT_INFO

    this.requestOptions = {
      url: initConfig.url,
      method: 'POST',
      data: DEFAULT_INFO,
      timeout: initConfig.timeout || 5000
    }
  }

  _logByEnv(level: string, content: string | object): LoggerPromise {
    if (inWx) {
      return limitP.call(this.wxRequestHttpLog, level, content, this)
    } else if (inMy) {
      return limitP.call(this.myRequestHttpLog, level, content, this)
    } else {
      return limitP.call(this.axiosHttpLog, level, content, this)
    }
  }

  log(level: string, content: string | object): LoggerPromise {
    return this._logByEnv(level, content)
  }

  info(content: string | object): LoggerPromise {
    return this._logByEnv('info', content)
  }

  warn(content: string | object): LoggerPromise {
    return this._logByEnv('warn', content)
  }

  error(content: string | object): LoggerPromise {
    return this._logByEnv('error', content)
  }

  axiosHttpLog(level: string, content: string | object, context: IFsLogger): LoggerPromise {
    return new Promise((resolve, reject) => {
      const sendInfo = generateSendInfo(context, level, content)
      axios({
        ...context.requestOptions,
        headers: {
          'content-type': 'application/json;charset=utf-8'
        },
        data: sendInfo
      })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  myRequestHttpLog(level: string, content: string | object, context: IFsLogger): LoggerPromise {
    return new Promise((resolve, reject) => {
      const sendInfo = generateSendInfo(context, level, content)
      my.request({
        ...context.requestOptions,
        headers: {
          'content-type': 'application/json;charset=utf-8'
        },
        data: sendInfo,
        dataType: 'json',
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }

  wxRequestHttpLog(level: string, content: string | object, context: IFsLogger): LoggerPromise {
    return new Promise((resolve, reject) => {
      const sendInfo = generateSendInfo(context, level, content)
      wx.request({
        ...context.requestOptions,
        header: {
          'content-type': 'application/json;charset=utf-8'
        },
        data: sendInfo,
        dataType: 'json',
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }

  /**
   * @function: 修改日志上报内容的基本字段
   * @author: guoxt
   * @param {ISendInfo} info
   * @return {*}
   */

  updateInfo(info: ISendInfo): void {
    this.sendInfo = {
      ...this.sendInfo,
      ...info
    }
  }
}

/**
 * @function: 根据使用场景初始化上报内容基础字段：小程序增加SystemInfo  浏览器平台增加UserAgent字段
 * @author: guoxt
 * @param {IFsLoggerConfig} config
 * @return {*}
 */
function initDefaultInfo(): void {
  if (!DEFAULT_INFO.SystemInfo && !inBrowser) {
    try {
      let info = inWx ? wx.getSystemInfoSync() : inMy ? my.getSystemInfoSync() : {}

      DEFAULT_INFO.SystemInfo = JSON.stringify(info)
    } catch (e) {
      handleError(e, 'initDefaultInfo()')
      throw e
    }
  }
  if (!DEFAULT_INFO.UserAgent && inBrowser) {
    DEFAULT_INFO.UserAgent = window.navigator.userAgent
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
function generateSendInfo(
  context: IFsLogger,
  level?: string,
  content?: string | object
): ISendInfo {
  let data = context.defaults.data
  data = typeof data === 'function' ? getData(data, context) : data || {}
  if (!isPlainObject(data)) {
    data = {}
    handleWarn('data functions should return an object')
  }
  if (content && typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  const timestamp = transitionTimestamp(new Date().getTime(), 'YYYY-MM-DD HH:MM:SS.ss')
  const sendInfo = {
    ...context.sendInfo,
    ...data,
    Level: level ? level.toUpperCase() : 'INFO',
    Content: content || '',
    LocalMachineTime: timestamp
  }
  return sendInfo
}
