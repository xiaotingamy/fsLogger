import FsLogger from '../../src/index'
// import FsLogger from 'fshows-logger'

const extra = {
  mode: '独立收银模式'
}
const logger = new FsLogger({
  url: 'https://event-upload.51fubei.com/common/event/synEvent/json', // 必填，上报地址
  scene: 'web', // 必填，使用场景
  data() { // 非必填
    return {
      AppId: `fs-web-project`,
      ...extra
    }
  }
})

const btnEl = document.getElementById('btn')
const changeEl = document.getElementById('change')

btnEl!.addEventListener('click', e => {
  logger.log('INFO', '我是一条info日志').then(res => {
    console.log('*******阿里云日志上报成功******', res)
  }).catch(err => {
    console.log('*******阿里云日志上报失败******', err)
  })
  logger.info('我是第二条info日志').then(res => {
    console.log('*******阿里云日志上报成功******', res)
  }).catch(err => {
    console.log('*******阿里云日志上报失败******', err)
  })
  logger.warn('我是一条warn日志')
  logger.error('我是一条error日志')
  logger.error({ errorCode: 1009, errorMsg: '网络繁忙，请稍后再试' })
})

changeEl!.addEventListener('click', e => {
  extra.mode = '插件模式'
})
