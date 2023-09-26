const app = getApp()
const util = require('../../../utils/util.js')

// pages/my/myBookList/myBookList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height,
    type: 1,
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
    console.log(options)
    var type = options.type ? parseInt(options.type) : 1;
    this.setData({
      type: type
    })
    this.render()
  },
  goback: function() {
    wx.navigateBack()
  },
  // render: function(type) {
    // this.myClick(type)
    // switch(type) {
    //   case 2: 
    //     this.click2();
    //     break;
    //   case 3: 
    //     this.click3();
    //     break;
    //   case 4: 
    //     this.click4();
    //     break;
    //   default:
    //     this.click1();
    //     break;
    // }
  // },
  //tabbar+动画
  myClick: function (e) {
    this.setData({
      type: parseInt(e.currentTarget.dataset.type)
    })
    this.render()
  },
  render: function() {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease-in-out",
      delay: 0
    })
    this.data.animation = animation
    animation.translate((this.globalData.windowWidth / 4) * (this.data.type - 1)).step()
    this.setData({
      animationData: animation.export(),
      inJob: true
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