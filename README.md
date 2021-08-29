# fsLogger 日志工具

## 使用

### 安装

```bash
npm install fshows-logger --save
```

### demo

```javascript
import FsLogger from 'fshows-logger'

const extra = {
  mode: 'my mode'
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

```

## 配置项

- 上报地址 url

- 场景 scene
  - web web网页/H5网页
  - wx 微信小程序
  - my 支付宝小程序

- 上报内容 data
  - 基础字段
    - AppId	应用ID， 默认为'fs-logger-default'
    - Content	上报内容，默认是空字符串
    - Level	日志级别，默认是INFO，大写字母
    - LocalMachineTime 本地上报时间
    - UserAgent  scene为web时，上报浏览器信息
    - SystemInfo  scene为wx/my时，上报系统信息
  - 其他自定义字段

|  参数名称  | 类型 | 是否必填  |  描述  |
|  ---- | ---- | ----  | ----  |
| url  | String| 必填 | 上报地址  |
| scene | String | 必填（'web', 'wx', 'my'） | 使用场景  |
| data  | Object/Function | 选填 |  上报的字段  |


## 方法

log

```javascript
log(level: string, content: string | object)
```

info

```javascript
info(content: string | object)
```

warn

```javascript
warn(content: string | object)
```

error

```javascript
error(content: string | object)
```
