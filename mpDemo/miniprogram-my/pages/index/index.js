import logger from '/utils/logger'
Page({
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  handleLog () {
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
  },
  changeMode () {
    getApp().globalData.mode = 'mode 2'
  }
});
