/*
 * @Description:
 * @version:
 * @Author: guoxt
 * @Date: 2021-08-22 14:54:20
 * @LastEditors: guoxt
 * @LastEditTime: 2021-08-27 13:54:06
 */
import { IFsLoggerConfig, Level, Scene } from './types'
import axiosHttpLog from './core/axios'
import myRequestHttpLog from './core/my'
import wxRequestHttpLog from './core/wx'
const FUNCTION_MAP = {
  web: axiosHttpLog,
  wx: wxRequestHttpLog,
  my: myRequestHttpLog
}
class FsLogger {
  defaults: IFsLoggerConfig

  constructor(initConfig: IFsLoggerConfig) {
    this.defaults = initConfig
  }

  _logByScene(scene: Scene, level: Level, content: string | object) {
    FUNCTION_MAP[scene](this.defaults, level, content)
  }

  log(level: Level, content: string | object) {
    const { scene } = this.defaults
    this._logByScene(scene, level, content)
  }

  info(content: string | object) {
    const { scene } = this.defaults
    this._logByScene(scene, 'info', content)
  }

  warn(content: string | object) {
    const { scene } = this.defaults
    this._logByScene(scene, 'warn', content)
  }

  error(content: string | object) {
    const { scene } = this.defaults
    this._logByScene(scene, 'error', content)
  }
}

export default FsLogger
