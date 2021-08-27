// import FsLogger from '../../src/index'
import FsLogger from 'fshows-logger'

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
      AppId: `fs-cashier-mina-project`,
      ...CUSTOM
    }
  }
})


const btnEl = document.getElementById('btn')

btnEl!.addEventListener('click', e => {
  logger.log('INFO', 'test log')
})
