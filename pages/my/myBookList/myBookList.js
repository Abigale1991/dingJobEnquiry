const app = getApp()
const util = require('../../../utils/util.js')

// pages/my/myBookList/myBookList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height,
    type: 1, // 1表示全部；2表示预约；3表示面试： 4表示入职；；传给后台则每个数字减1
    animationData: {}, //存储tab切换动画数据
    myJobList: [{}, {}, {}, {}, {}, {}],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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
    animation.translate((app.globalData.windowWidth / 4) * (this.data.type - 1)).step()
    this.setData({
      animationData: animation.export(),
      inJob: true
    })
    this.getDatas(this.data.type, 1, 10)
  },
  getDatas: function(type, page_num, page_size) {
    var data = {status: type - 1, page_num: page_num, page_size: page_size}
    util.dingRequest('apply_job_list', 'GET', data).then((res) => {
      console.log('apply_job_list接到参数：', res)
      this.renderData(res, page_num)
    })
  },
  renderData: function(res, page_num) {
    res.forEach((item)=> {
      item.date = item.create_time.split(' ')[0]
      item.logoUrl = util.getImageUrl(item.logo)
    })
    if (page_num == 1) {
      this.setData({
        myJobList: res
      })
    } else {
      this.myJobList.push(res)
      this.setData({
        myJobList: this.myJobList
      })
    }
    console.log("this.data.myJobList:", this.data.myJobList)
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