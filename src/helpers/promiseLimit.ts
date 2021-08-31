class PromiseLimit {
  limit: number
  blockQueue: any[]
  currentReqNumber: number
  isCancel: boolean

  constructor(limit?: number) {
    this.limit = limit || 2
    this.blockQueue = []
    this.currentReqNumber = 0
    this.isCancel = false
  }

  async call(req: any, ...args: any[]) {
    if (!req) {
      throw new Error('req is required.')
    }
    if (Object.prototype.toString.call(req) !== '[object Function]') {
      throw new Error('Req must be a function.')
    }
    if (this.isCancel) return
    if (this.currentReqNumber >= this.limit) {
      // 阻塞队列增加一个 Pending 状态的 Promise
      await new Promise(resolve => this.blockQueue.push(resolve))
    }
    return this._handlerReq(req, args)
  }

  async _handlerReq(req: any, args: any) {
    this.currentReqNumber++
    try {
      return await req(...args)
    } catch (err) {
      return Promise.reject(err)
    } finally {
      this.currentReqNumber--
      if (this.blockQueue.length) {
        this.blockQueue[0]()
        this.blockQueue.shift()
      }
    }
  }

  cancel() {
    this.blockQueue = []
    this.currentReqNumber = 0
    this.isCancel = true
  }
}

export default PromiseLimit
