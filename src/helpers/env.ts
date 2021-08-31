export const inBrowser = typeof window !== 'undefined'
export const inWx = typeof wx !== 'undefined' && !!wx.getSystemInfoSync()
export const inMy = typeof my !== 'undefined' && !!my.getSystemInfoSync()
