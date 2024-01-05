// pages/partner/myPart/myPart.js
const app = getApp()
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height,
    scrollHeight: 0,// 可滚动区域高度
    inJob: true, // true表示在职中
    animationData: {}, //存储tab切换动画数据
    myJobList: [],
    page_num: 1, // 页码
    page_size: 10, // 每页多少数据
    tipsWord: '没有更多数据了',
    isTipsShow: false, // 提醒没有更多数据了
    resData: [{"age":0,"tel":"18810686179","name":"韩海燕","avatar":"AVATAR.1697697950404.9d6721112b3e8841a613dc4bb7c057d1.jpg","id":22,"status":"在职","corporate":"京邦达供应链科技有限公司","job_name":"京东小件分拣员","salary_max":8000,"salary_min":5500,"create_time":"2023-10-15 23:51:25","logo":"jdlogistics.png"}]
  },
  globalData: {
    windowWidth: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // wx.getSystemInfo({
    //   success:  (res) => {
    //     console.log('widRes:', res)
    //     this.globalData.windowWidth = res.windowWidth
    //   }
    // })
    this.getHeight()
    this.getDatas(1, 10)
  },
  goback: function() {
    wx.navigateBack()
  },
  getDatas: function() {
    var status = this.data.inJob ? 1 : 0
    var data = {status: status, page_num: this.data.page_num, page_size: this.data.page_size}
    util.dingRequest('recommend_workers', 'GET', data).then((res) => {
      console.log('recommend_workers接到参数：', res)
      // var temp = [],i = 0
      // for(i=0;i<10;i++) {
      //   temp.push(this.data.resData[0])
      // }
      // this.renderData(temp)
      this.renderData(res)
    })
  },
  renderData: function(res) {
    if (res && res.length > 0) {
      var showDataTemp = []
      res.forEach((item)=> {
        item.avatarUrl = util.getImageUrl(item.avatar)
        if (this.data.page_num == 1) {
          showDataTemp.push(item)
        } else {
          this.data.myJobList.push(item)
        }
      })
      if (this.data.page_num == 1) {
        this.setData({
          myJobList: showDataTemp
        })
      } else {
        // this.data.myJobList.push(res)
        this.setData({
          myJobList: this.data.myJobList
        })
      }
      this.data.page_num++
    } else {
      if (this.data.page_num == 1) {
        this.setData({
          showDataList: []
        })
      }
      this.setData({
        tipsWord: '没有查到更多数据',
        isTipsShow: true
      })
    }
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
    this.data.page_num = 1
    this.getDatas()
  },
  //tabbar+动画=>点击已离职
  toDimission: function () {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease-in-out",
      delay: 0
    })
    this.animation = animation
    animation.translate(app.globalData.windowWidth / 2).step()
    this.setData({
      animationData: animation.export(),
      inJob: false
    })
    this.data.page_num = 1
    this.getDatas()
  },
  getHeight: function () {
    var allWidth
    var allHeight
    wx.getSystemInfo({
      success: function (res) {
        allWidth = res.windowWidth
        allHeight = res.windowHeight
      }
    })
    var titleHeight = this.data.height + 46
    var scrollHeight = allHeight - titleHeight - 45
    this.setData({
      scrollHeight: scrollHeight
    })
  },
  togetMoreData: function(e) {
    console.log('触发去加载更多', e)
    this.getDatas()
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