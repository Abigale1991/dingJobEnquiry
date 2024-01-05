const app = getApp()
const util = require('../../../utils/util.js')

// pages/my/myBookList/myBookList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height,
    scrollHeight: 0,// 可滚动区域高度
    type: 1, // 1表示全部；2表示预约；3表示面试： 4表示入职；；传给后台则每个数字减1
    animationData: {}, //存储tab切换动画数据
    myJobList: [],
    page_num: 1, // 页码
    page_size: 10, // 每页多少数据
    tipsWord: '没有更多数据了',
    isTipsShow: false, // 提醒没有更多数据了
    resData: [{"id":9,"status":"面试失败","corporate":"京邦达供应链科技有限公司","job_name":"京东小件分拣员","salary_max":8000,"salary_min":5500,"create_time":"2023-10-08 15:45:23","logo":"jdlogistics.png"}]
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
      page_num: 1,
      myJobList: [],
      isTipsShow: false
    })
    this.getDatas()
  },
  getDatas: function() {
    var data = {status: this.data.type - 1, page_num: this.data.page_num, page_size: this.data.page_size}
    util.dingRequest('apply_job_list', 'GET', data).then((res) => {
      console.log('apply_job_list接到参数：', res)
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
        item.date = item.create_time.split(' ')[0]
        item.logoUrl = util.getImageUrl(item.logo)
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
        // this.myJobList.push(res)
        this.setData({
          myJobList: this.data.myJobList
        })
      }
      console.log("this.data.myJobList:", this.data.myJobList)
      this.data.page_num++
    } else {
      if (this.data.page_num == 1) {
        this.setData({
          myJobList: []
        })
      }
      this.setData({
        tipsWord: '没有查到更多数据',
        isTipsShow: true
      })
    }
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