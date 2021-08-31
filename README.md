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

- 上报内容 data
  - 基础字段
    - AppId	应用ID， 默认为'fs-logger-default'
    - Content	上报内容，默认是空字符串
    - Level	日志级别，默认是INFO，大写字母
    - LocalMachineTime 本地上报时间
    - UserAgent  浏览器环境，上报浏览器信息
    - SystemInfo  小程序环境，上报系统信息
  - 其他自定义字段

|  参数名称  | 类型 | 是否必填  |  描述  |
|  ---- | ---- | ----  | ----  |
| url  | String| 必填 | 上报地址  |
| data  | Object/Function | 选填 |  上报的字段  |

## 方法

log 上报日志

```javascript
log(level: string, content: string | object)
```

info 上报level为info的日志

```javascript
info(content: string | object)
```

warn 上报level为warn的日志

```javascript
warn(content: string | object)
```

error 上报level为error的日志

```javascript
error(content: string | object)
```

updateInfo  修改上报字段信息

info参数是上报字段对象，接口定义如下：

```javascript
updateInfo(info: ISendInfo)
```

```typescript
interface ISendInfo {
  AppId?: string
  Content?: string | object
  Level?: string
  LocalMachineTime?: string | undefined
  UserAgent?: string
  SystemInfo?: string
  [propName: string]: any
}
```
