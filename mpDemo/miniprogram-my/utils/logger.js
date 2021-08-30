import FsLogger from 'fshows-logger'
const app = getApp()
export default new FsLogger({
  url: 'https://event-upload.51fubei.com/common/event/synEvent/json',
  scene: 'my',
  data() {
    return {
      AppId: `fs-ali-mina-project`,
      mode: app.globalData.mode
    }
  }
})