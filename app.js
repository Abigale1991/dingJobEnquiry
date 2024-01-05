// app.js
const util = require('./utils/util.js')
App({
  onLaunch() {
  },
  onShow() {
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.height = res.statusBarHeight
        this.globalData.windowWidth = res.windowWidth
      }
    })
    // 登录
    var token = wx.getStorageSync('token');
    if (!token) {
      util.getToken()
    } else {
      util.toGetUserInfo()
    }
  },
  globalData: {
    height: 0,
    windowWidth: 0,
    avatarUrl: '',
    nickName: '',
    hot_jobs: []
  }
})
