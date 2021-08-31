import FsLogger from 'fshows-logger'
const extra = {
  mode: getApp().globalData.mode
}
const logger = new FsLogger({
  url: 'https://event-upload.51fubei.com/common/event/synEvent/json',
  data() {
    return {
      AppId: `fs-wechat-mina-project`,
      ...extra
    }
  }
})
export default logger
