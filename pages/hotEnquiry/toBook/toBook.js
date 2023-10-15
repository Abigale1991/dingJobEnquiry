// pages/hotEnquiry/toBook/toBook.js
const app = getApp()
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    job_id: -1, // 岗位ID
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
    console.log("jobToBook_options:", options)
    if (options.job_id) {
      this.data.job_id = options.job_id
    }
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
    if (this.data.name.length < 1 || this.data.phoneNum.length < 1 || this.data.date.length < 1) {
      wx.showToast({
        title: '请将信息填写完整',
        icon: "none",
        duration: 1000
      })
      return;
    }
    var data = {
      job_id: this.data.job_id, 
      tel: this.data.phoneNum, 
      name: this.data.name, 
      birthday: this.data.date
    }
    // var data = {
    //   referee_open_id: app.globalData.openId, 
    //   job_id: 1, 
    //   tel: "13012345", 
    //   name: "申请人姓名", 
    //   birthday: "2001-01-10", 
    //   token: "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlY2IyMGI2NTRhZTU0YzQ1YmIzYWM4MzY2YTA0NGJiZSIsInN1YiI6IldFQ0hBVC5lbXBsb3lfdGVzdCIsImlzcyI6InNnIiwiaWF0IjoxNjk2NzM1MDY3LCJleHAiOjE2OTczMzk4Njd9.nJkTwgP94hCRMoBgpv3Z-BKoLYJ5FhAxbLSsk9kCz9Y"
    // }
    util.reqPost('apply_job', data, app.globalData.token).then((res) => {
      console.log('apply_job接到参数：', res)
      if (res && res.success == '1') {
        wx.showToast({
          title: '报名成功',
          icon: "none",
          duration: 1000,
          mask: true
        })
        setTimeout(()=> {
          wx.navigateBack({delta: 1})
        }, 1000)
      }
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