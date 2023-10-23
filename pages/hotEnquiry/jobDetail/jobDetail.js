const app = getApp()
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height,
    job_id: -1,
    jobInfo: {}, // 这里有个refreID，这个是当前用户自己的，分享给别人的时候带这个
    testinfo: "招聘岗位: 物流分拣员\n工作内容：根据现场安排负责将商品按照订单地址归类",
    referID: '' // 别人分享过来带来的referID，不是自己获取的；这个是去报名的时候要传给后台的
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("jobDetail_options:", options)
    if (options.job_id) {
      this.data.job_id = options.job_id
      this.getData()
    }
    if (options.referID) {
      this.data.referID = options.referID
    }
  },
  getData: function() {
    var data = {job_id: this.data.job_id}
    util.dingRequest("job_info", 'GET', data).then((res) => {
      console.log('job_info接到岗位参数：', res)
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
    console.log(getCurrentPages())
    if (getCurrentPages().length < 2) {
      wx.switchTab({
        url: '/pages/hotEnquiry/hotIndex/hotIndex',
      })
    } else {
      wx.navigateBack({delta: 1})
    }
  },
  toBook: function() {
    // 这里是把别人分享带过来的referID带到下一页去，如果走到报名就带给后台
    var refer = ''
    if (this.data.referID & (this.data.referID != this.data.jobInfo.referID)) {
      var refer = '&referID=' + this.data.referID
    }
    wx.navigateTo({
      url: '/pages/hotEnquiry/toBook/toBook?job_id=' + this.data.job_id + refer
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
    // 分享给别人带的是自己的referID
    const shareURL = 'pages/hotEnquiry/jobDetail/jobDetail?referID=' + this.data.jobInfo.referID + '&job_id=' + this.data.job_id
    return {
      title: '岗位详情',
      desc: '为您提供权威的岗位服务',
      path: encodeURI(shareURL),
      success: function (res) {
        console.log('成功返回值','res')
      },
      fail: function (res) {
      }
    }
  }
})