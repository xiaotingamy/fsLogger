/*
 * @Description:
 * @version:
 * @Author: guoxt
 * @Date: 2021-08-22 14:54:20
 * @LastEditors: guoxt
 * @LastEditTime: 2021-08-23 22:06:02
 */
import { IFsLoggerConfig, Level } from './types'
import axiosHttpLog from './core/axios'
import myRequestHttpLog from './core/my'
import wxRequestHttpLog from './core/wx'

class FsLogger {
  defaults: IFsLoggerConfig

  constructor(initConfig: IFsLoggerConfig) {
    this.defaults = initConfig
  }

  log(level: Level, content: string | object) {
    const { scene } = this.defaults
    if (scene === 'web') {
      axiosHttpLog(this.defaults, level, content)
    }
    if (scene === 'my') {
      myRequestHttpLog(this.defaults, level, content)
    }
    if (scene === 'wx') {
      wxRequestHttpLog(this.defaults, level, content)
    }
  }
}

export default FsLogger
