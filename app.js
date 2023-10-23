// app.js
const util = require('./utils/util.js')
App({
  onLaunch() {
    // 登录
    var token = wx.getStorageSync('token');
    if (!token) {
      util.getToken()
    }
  },
  onShow() {
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.height = res.statusBarHeight
        this.globalData.windowWidth = res.windowWidth
      }
    })
  },
  globalData: {
    height: 0,
    windowWidth: 0,
    avatarUrl: '',
    nickName: '',
    hot_jobs: []
  }
})
