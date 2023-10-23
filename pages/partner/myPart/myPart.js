// pages/partner/myPart/myPart.js
const app = getApp()
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height,
    inJob: true, // true表示在职中
    animationData: {}, //存储tab切换动画数据
    myJobList: [{}, {}, {},{}, {}, {},{}, {}, {}]
  },
  globalData: {
    windowWidth: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.getSystemInfo({
      success:  (res) => {
        this.globalData.windowWidth = res.windowWidth
      }
    })
    this.getDatas(1, 10)
  },
  goback: function() {
    wx.navigateBack()
  },
  getDatas: function(page_num, page_size) {
    var status = this.data.inJob ? 1 : 0
    var data = {status: status, page_num: page_num, page_size: page_size}
    util.dingRequest('recommend_workers', 'GET', data).then((res) => {
      console.log('recommend_workers接到参数：', res)
      // this.renderData(res, page_num)
    })
  },
  //tabbar+动画 =》点击在职中
  onJob: function () {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease-in-out",
      delay: 0
    })
    this.animation = animation
    animation.translate(0).step()
    this.setData({
      animationData: animation.export(),
      inJob: true
    })
    this.getDatas(1, 10)
  },
  //tabbar+动画=>点击已离职
  toDimission: function () {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease-in-out",
      delay: 0
    })
    this.animation = animation
    animation.translate(this.globalData.windowWidth / 2).step()
    this.setData({
      animationData: animation.export(),
      inJob: false
    })
    this.getDatas(1, 10)
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