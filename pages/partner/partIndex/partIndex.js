// pages/partner/partIndex/partIndex.js
const app = getApp()
const util = require('../../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height,
    isParter: false,
    tipsList: [{
      id: 1,
      imgUrl: '../../../resources/images/parttip1.png',
      tipWord: '每推荐成功 1 人入职做满 10天，立返200元'
    }, {
      id: 2,
      imgUrl: '../../../resources/images/parttip2.png',
      tipWord: '获取附近独家招聘岗位信息'
    },{
      id: 3,
      imgUrl: '../../../resources/images/parttip3.png',
      tipWord: '固定周期免费培训元'
    },{
      id: 4,
      imgUrl: '../../../resources/images/parttip4.png',
      tipWord: '会费50元，退会立即退款'
    }],
    joinHeight: 0,
    showBottom: false,
    name: '', // 姓名
    phoneNum: '', // 手机号
    idNum: '', // 身份证号
    isPartHot: [{},{},{},{},{}],
    featureList: ['18-28岁','早7-晚8','五险一金','提供住宿']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  toJoin: function() {
    // this.setData({
    //   joinHeight: 662
    // })
    this.setData({
      showBottom: true
    })
  },
  toClose: function() {
    // this.setData({
    //   joinHeight: 0
    // })
    this.setData({
      showBottom: false
    })
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
  // 身份证号输入
  bindInputIdNum: function (e) {
    console.log(e)
    this.setData({
      idNum: e.detail.value
    })
  },
  toBook: function () {
    console.log(this.data.name, this.data.phoneNum, this.data.idNum)
    // wx.navigateTo({
    //   url: '/pages/partner/myPart/myPart'
    // })
    this.setData({
      isParter: true
    })
  },
  toRight: function() {
    wx.navigateTo({
      url: '/pages/partner/myPart/myPart'
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