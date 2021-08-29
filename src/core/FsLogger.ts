import { IFsLoggerConfig, Scene, ISendInfo, LoggerPromise, IFsLogger } from '../types'
import axios from 'axios'
import { transitionTimestamp, getData } from '../helpers/util'

const DEFAULT_INFO: ISendInfo = {
  AppId: 'fs-logger-default',
  Level: 'INFO',
  Content: ''
}

/**
 * @function: 根据使用场景初始化上报内容基础字段：小程序增加SystemInfo  浏览器平台增加UserAgent字段
 * @author: guoxt
 * @param {IFsLoggerConfig} config
 * @return {*}
 */
function initDefaultInfo(config: IFsLoggerConfig): void {
  const { scene } = config
  if (!DEFAULT_INFO.SystemInfo && scene !== 'web') {
    try {
      let info =
        scene === 'wx' ? wx.getSystemInfoSync() : scene === 'my' ? my.getSystemInfoSync() : {}

      DEFAULT_INFO.SystemInfo = JSON.stringify(info)
    } catch (e) {
      throw e
    }
  }
  if (!DEFAULT_INFO.UserAgent && scene === 'web') {
    DEFAULT_INFO.UserAgent = window.navigator.userAgent
  }
}

function initData(context: IFsLogger) {
  let data = context.defaults.data
  data = typeof data === 'function' ? getData(data, context) : data || {}
  return data
}

export default class FsLogger {
  defaults: IFsLoggerConfig
  sendInfo: ISendInfo

  constructor(initConfig: IFsLoggerConfig) {
    this.defaults = initConfig
    // 初始化DEFAULT_INFO
    initDefaultInfo(initConfig)
    this.sendInfo = DEFAULT_INFO
  }

  _logByScene(scene: Scene, level: string, content: string | object): LoggerPromise {
    if (scene === 'wx') {
      return this.wxRequestHttpLog(level, content)
    } else if (scene === 'my') {
      return this.myRequestHttpLog(level, content)
    } else {
      return this.axiosHttpLog(level, content)
    }
  }

  log(level: string, content: string | object): LoggerPromise {
    const { scene } = this.defaults
    return this._logByScene(scene, level, content)
  }

  info(content: string | object): LoggerPromise {
    const { scene } = this.defaults
    return this._logByScene(scene, 'info', content)
  }

  warn(content: string | object): LoggerPromise {
    const { scene } = this.defaults
    return this._logByScene(scene, 'warn', content)
  }

  error(content: string | object): LoggerPromise {
    const { scene } = this.defaults
    return this._logByScene(scene, 'error', content)
  }

  axiosHttpLog(level?: string, content?: string | object): LoggerPromise {
    return new Promise((resolve, reject) => {
      if (content && typeof content !== 'string') {
        content = JSON.stringify(content)
      }
      const data = initData(this)
      const timestamp = transitionTimestamp(new Date().getTime(), 'YYYY-MM-DD HH:MM:SS')

      const sendInfo = {
        ...this.sendInfo,
        ...data,
        Level: level ? level.toUpperCase() : 'INFO',
        Content: content || '',
        LocalMachineTime: timestamp
      }
      axios({
        url: this.defaults.url,
        method: 'POST',
        headers: {
          'content-type': 'application/json;charset=utf-8'
        },
        data: JSON.stringify(sendInfo),
        timeout: 5000
      })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  myRequestHttpLog(level?: string, content?: string | object): LoggerPromise {
    return new Promise((resolve, reject) => {
      if (content && typeof content !== 'string') {
        content = JSON.stringify(content)
      }
      const data = initData(this)
      const timestamp = transitionTimestamp(new Date().getTime(), 'YYYY-MM-DD HH:MM:SS')

      const sendInfo = {
        ...this.sendInfo,
        ...data,
        Level: level ? level.toUpperCase() : 'INFO',
        Content: content || '',
        LocalMachineTime: timestamp
      }
      my.request({
        headers: {
          'content-type': 'application/json;charset=utf-8'
        },
        url: this.defaults.url,
        method: 'POST',
        data: sendInfo,
        timeout: 5000,
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

  wxRequestHttpLog(level?: string, content?: string | object): LoggerPromise {
    return new Promise((resolve, reject) => {
      if (content && typeof content !== 'string') {
        content = JSON.stringify(content)
      }
      const data = initData(this)
      const timestamp = transitionTimestamp(new Date().getTime(), 'YYYY-MM-DD HH:MM:SS')

      const sendInfo = {
        ...this.sendInfo,
        ...data,
        Level: level ? level.toUpperCase() : 'INFO',
        Content: content || '',
        LocalMachineTime: timestamp
      }

      wx.request({
        header: {
          'content-type': 'application/json;charset=utf-8'
        },
        url: this.defaults.url,
        method: 'POST',
        data: JSON.stringify(sendInfo),
        timeout: 5000,
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
