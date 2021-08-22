/*
 * @Description:
 * @version:
 * @Author: guoxt
 * @Date: 2021-08-22 15:34:18
 * @LastEditors: guoxt
 * @LastEditTime: 2021-08-22 17:04:57
 */

import { IFsLoggerConfig } from '../types'
import axios from 'axios'
import { transitionTimestamp } from '../helpers/util'

export default function axiosHttpLog(
  config: IFsLoggerConfig,
  level?: string,
  content?: string | object
) {
  const { url, data } = config
  const timestamp = transitionTimestamp(new Date().getTime(), 'YYYY-MM-DD HH:MM:SS')
  if (content && typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  // 基础字段
  const baseData = {
    AppId: 'fs-logger', // 默认的appid
    Level: level || 'INFO',
    Content: content || '',
    LocalMachineTime: timestamp,
    UserAgent: window.navigator.userAgent
  }
  // 自定义字段
  const customData = data()

  // 合并上报字段
  const sendContent = {
    ...baseData,
    ...customData
  }
  axios({
    url,
    method: 'post',
    headers: {
      'content-type': 'application/json;charset=utf-8'
    },
    data: JSON.stringify(sendContent),
    timeout: 5000
  })
    .then(res => {
      console.log('阿里云日志上报成功', res)
    })
    .catch(err => {
      console.log('阿里云日志上报失败', err)
    })
}
