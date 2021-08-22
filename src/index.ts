/*
 * @Description:
 * @version:
 * @Author: guoxt
 * @Date: 2021-08-22 14:54:20
 * @LastEditors: guoxt
 * @LastEditTime: 2021-08-22 17:02:44
 */
import { IFsLoggerConfig, Level } from './types'
import axiosHttpLog from './core/axios'

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
  }
}

export default FsLogger
