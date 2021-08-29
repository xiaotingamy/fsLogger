import FsLogger from '../../src/index'
// import FsLogger from 'fshows-logger'

const CUSTOM = {
  CashierMode: 'mode',
  ClientSession: 'session',
  ClientNetwork: 'slow',
  ClientDeviceInfo: 'info'
}
const logger = new FsLogger({
  url: 'https://event-upload.51fubei.com/common/event/synEvent/json',
  scene: 'web',
  data() {
    return {
      AppId: `fs-web-project`,
      ...CUSTOM
    }
  }
})


const btnEl = document.getElementById('btn')
const btnEl1 = document.getElementById('btn1')

btnEl!.addEventListener('click', e => {
  logger.log('INFO', 'info log...').then(res => {
    console.log('阿里云日志上报成功******', res)
  })
})

btnEl1!.addEventListener('click', e => {
  CUSTOM.CashierMode = 'mode+1'
  console.log(CUSTOM.CashierMode)
  // logger.error({ errorCode: 1009, errorMsg: '网络繁忙，请稍后再试' })
})
