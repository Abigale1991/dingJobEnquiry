// pages/partner/myPart/myPart.js
const app = getApp()
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height,
    inJob: true,
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
  },
  goback: function() {
    wx.navigateBack()
  },
  //tabbar+动画
  byFlightNo: function () {
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
  },
  //tabbar+动画
  byCityName: function () {
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