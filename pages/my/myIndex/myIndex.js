// pages/my/myIndex/myIndex.js
const app = getApp()
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    online: true,
    ownInfo: {}, // 页面上个人信息
    choiceList: [{
      id: 1,
      choiceIcon: '../../../resources/images/myHelp.png',
      choiceTitle: '帮助',
      path: '/pages/my/help/help'
    }, {
      id: 2,
      choiceIcon: '../../../resources/images/myAbout.png',
      choiceTitle: '关于',
      path: '/pages/my/about/about'
    }],
    avatarUrl: '../../../resources/images/visitor.png', // 微信头像
    nickName: '' // 昵称
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (app.globalData.avatarUrl) {
      this.setData({
        avatarUrl: app.globalData.avatarUrl,
        nickName: app.globalData.nickName
      })
    }
  },
  getDatas: function () {
    util.reqGet('get_wechat_user', {}, app.globalData.token).then((res) => {
      console.log('get_wechat_user接到参数：', res)
      this.setData({ownInfo: res})
      console.log(this.data.nickName, this.data.avatarUrl)
      if (res.avatarUrl && res.avatarUrl != this.data.avatarUrl) {
        this.setData({
          avatarUrl: util.getImageUrl(res.avatarUrl),
        })
        app.globalData.avatarUrl = util.getImageUrl(res.avatarUrl)
      }
      if (res.nickName && res.nickName != this.data.nickName) {
        this.setData({
          nickName: res.nickName
        })
        app.globalData.nickName = res.nickName
      }
    })
  },
  toGetUserProfile: function (e) {
    console.log(e)
    this.setData({
      avatarUrl: e.detail.avatarUrl
    })
    app.globalData.avatarUrl = e.detail.avatarUrl
    wx.uploadFile({
      filePath: e.detail.avatarUrl,
      name: 'avatarImg',
      url: 'https://m.fncyy.com/api/employ/upload_avatar',
      header: {token: app.globalData.token},
      success: (res) => {
        console.log('上传文件：', res)
        if (res && res.data) {
          var dataObj = JSON.parse(res.data)
          if (dataObj.errCode == 0 && dataObj.data) {
            this.setData({
              avatarUrl: util.getImageUrl(dataObj.data)
            })
            app.globalData.avatarUrl = e.detail.avatarUrl
          }
        }
      }
    })
  },
  toInputChange: function (e) {
    console.log(e)
    this.setData({
      nickName: e.detail.value
    })
  },
  toNicknameBlur: function (e) {
    console.log(e)
    console.log(this.data.nickName)
    if (this.data.nickName.length > 0) {
      // 上传给后台
      this.uploadAvatar()
    }
  },
  // 上传头像昵称
  uploadAvatar: function () {
    var data = {
      // avatarUrl: app.globalData.avatarUrl,
      nickName: this.data.nickName
    }
    util.reqPost('set_wechat_user', data, app.globalData.token).then((res) => {
      console.log('set_wechat_user接到参数：', res)
      // if (res && res.success == '1') {
      //   wx.showToast({
      //     title: '报名成功,',
      //     icon: "none",
      //     duration: 1000,
      //     mask: true
      //   })
      //   setTimeout(()=> {
      //     wx.navigateBack({delta: 1})
      //   }, 1000)
      // }
    })
  },
  toBook: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/my/myBookList/myBookList?type=' + e.currentTarget.dataset.type
    })
  },
  toAccount: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    console.log(this.data.choiceList[id-1])
    wx.navigateTo({
      url: this.data.choiceList[id-1].path
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getDatas()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})