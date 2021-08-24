/*
 * @Description: 接口/类型声明
 * @version:
 * @Author: guoxt
 * @Date: 2021-08-22 14:57:55
 * @LastEditors: guoxt
 * @LastEditTime: 2021-08-23 22:18:06
 */
export type Scene = 'web' | 'wx' | 'my'
export type Level = 'INFO' | 'WARN' | 'ERROR'

/**
 * @interface 上报内容
 */
export interface IRequestContent {
  AppId?: string
  Content?: string | object
  Level?: Level
  LocalMachineTime?: string
  UserAgent?: string
  SystemInfo?: string
  [propName: string]: any
}

/**
 * @interface 配置选项
 */
export interface IFsLoggerConfig {
  url: string
  scene: Scene
  data: () => IRequestContent

  [propName: string]: any
}
