import FsLogger from 'fshows-logger'
export default new FsLogger({
  url: 'https://event-upload.51fubei.com/common/event/synEvent/json',
  scene: 'wx',
  data() {
    return {
      AppId: `fs-wechat-mina-project`
    }
  }
})