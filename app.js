// app.js
const util = require('./utils/util.js')
App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
  },
  onShow() {
    // 登录
    wx.login({
      success: res => {
        console.log("获取wx.login的code:")
        console.log(res.code)
        // this.globalData.openId = "open_id"
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var data = {code: res.code}
        util.reqPost('wechat_login', data).then((res) => {
          console.log('wechat_login接到参数：', res)
          this.globalData.token = res.token
        })
      }
    })

    wx.getSystemInfo({
      success: (res) => {
        this.globalData.height = res.statusBarHeight
      }
    })
  },
  globalData: {
    statusBarHeight: 0,
    token: '',
    avatarUrl: '',
    nickName: ''
  }
})
