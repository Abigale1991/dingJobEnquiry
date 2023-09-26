const app = getApp()
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height,
    jobid: -1,
    jobInfo: {},
    testinfo: "招聘岗位: 物流分拣员\n工作内容：根据现场安排负责将商品按照订单地址归类"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("options:", options)
    if (options.jobid) {
      this.data.jobid = options.jobid
      this.getData()
    }
  },
  getData: function() {
    var data = {job_id: this.data.jobid}
    util.reqPost("job_info", data).then((res) => {
      console.log('接到岗位参数：', res)
      res.corporateList = [];
      var picList = res.corporatePics.split(',')
      picList.forEach((item) => {
        res.corporateList.push({imgUrl: util.getImageUrl(item)})
      })
      res.featureList = res.features.split('&&')
      res.logaUrl = util.getImageUrl(res.logo)

      this.setData({
        jobInfo: res
      })
    })
  },
  goback: function() {
    wx.navigateBack()
  },
  toBook: function() {
    wx.navigateTo({
      url: '/pages/hotEnquiry/toBook/toBook'
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