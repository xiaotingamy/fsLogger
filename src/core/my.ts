/*
 * @Description:
 * @version:
 * @Author: guoxt
 * @Date: 2021-08-22 15:35:58
 * @LastEditors: guoxt
 * @LastEditTime: 2021-08-22 17:19:11
 */
import { IFsLoggerConfig } from '../types'
import { transitionTimestamp } from '../helpers/util'

export default function myRequestHttpLog(
  config: IFsLoggerConfig,
  level?: string,
  content?: string | object
) {
  const { url, data } = config
  const timestamp = transitionTimestamp(new Date().getTime(), 'YYYY-MM-DD HH:MM:SS')
  if (content && typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  const systemInfo = my.getSystemInfoSync()
  console.log(systemInfo)

  // 基础字段
  const baseData = {
    AppId: 'fs-logger', // 默认的appid
    Level: level || 'INFO',
    Content: content || '',
    LocalMachineTime: timestamp,
    SystemInfo: JSON.stringify(systemInfo)
  }
  // 自定义字段
  const customData = data()

  // 合并上报字段
  const sendContent = {
    ...baseData,
    ...customData
  }
  my.request({
    headers: {
      'content-type': 'application/json;charset=utf-8'
    },
    url,
    method: 'POST',
    data: JSON.stringify(sendContent),
    timeout: 5000,
    dataType: 'json',
    success() {
      console.log('阿里云日志上报成功')
    },
    fail() {
      console.log('阿里云日志上报失败')
    }
  })
}