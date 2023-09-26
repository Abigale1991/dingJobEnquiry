// pages/hotEnquiry/toBook/toBook.js
const app = getApp()
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height,
    cardList: [{
      imgSrc: "http://oss.umetrip.com/fs/serviceRecommend/1323,3a5ef964ec658103",
      targetUrl: ''
    },{
      imgSrc: "http://oss.umetrip.com/fs/serviceRecommend/530,31aa6c54d7ca46cd",
      targetUrl: ''
    }],
    dotsflag: true,
    name: '', // 姓名
    phoneNum: '', // 手机号
    date: '' // 生日
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  goback: function() {
    wx.navigateBack()
  },
  // 姓名输入
  bindInputName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  // 手机号输入
  bindInputphoneNum: function (e) {
    console.log(e)
    this.setData({
      phoneNum: e.detail.value
    })
  },
  //日期选择器
  bindDateChange: function (e) {
    console.log(e)
    this.setData({
      date: e.detail.value
    })
  },
  toBook: function () {
    console.log(this.data.name, this.data.phoneNum, this.data.date)
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