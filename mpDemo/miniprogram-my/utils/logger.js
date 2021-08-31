import FsLogger from 'fshows-logger'
const app = getApp()
const logger = new FsLogger({
  url: 'https://event-upload.51fubei.com/common/event/synEvent/json',
  data() {
    return {
      AppId: `fs-ali-mina-project`,
      mode: app.globalData.mode
    }
  }
})
export default logger
