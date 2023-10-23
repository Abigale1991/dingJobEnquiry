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
    isPartHot: [], // 成为合伙人后，下面的热门岗位推荐
    featureList: ['18-28岁','早7-晚8','五险一金','提供住宿'],
    prePayId: '', // 支付参数
    recommendNum: '--', // 成合伙人后：推荐
    cashableAmount: '--',  // 成合伙人后：可提现金额
    trainNotice: '' // 成合伙人后：公告
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },
    /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (this.data.isPartHot.length < 1) {
      this.setData({
        isPartHot: app.globalData.hot_jobs
      })
    }
    this.setData({
      isParter: wx.getStorageSync('isPartner') || false
    })
    if (this.data.isParter) {
      util.dingRequest("partner_info", 'GET', {}).then((res) => {
        console.log('partner_info接到岗位参数：', res)
        if (res.partner) {
          // if (res.partner.recommendNum !== this.data.recommendNum) {
            this.setData({
              recommendNum: res.partner.recommendNum,
              cashableAmount: res.partner.cashableAmount
            })
          // }
          // if (res.partner.cashableAmount !== this.data.cashableAmount) {
          //   this.setData({
          //     cashableAmount: res.partner.cashableAmount
          //   })
          // }
        }
        this.setData({
          trainNotice: res.trainNotice
        })
        // if (res.partner.trainNotice !== this.data.trainNotice) {
        //   this.setData({
        //     trainNotice: res.partner.trainNotice
        //   })
        // }
        // this.setData({
        //   partner_info: res.partner,
        //   trainNotice: res.trainNotice
        // })
      })
    }
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
    // console.log(e)
    this.setData({
      phoneNum: e.detail.value
    })
  },
  // 身份证号输入
  bindInputIdNum: function (e) {
    // console.log(e)
    this.setData({
      idNum: e.detail.value
    })
  },
  toBook: function () {
    console.log(this.data.name, this.data.phoneNum, this.data.idNum)
    if (this.data.name.length < 1 || this.data.phoneNum.length < 1 || this.data.idNum.length < 1) {
      wx.showToast({
        title: '请将信息填写完整',
        icon: "none",
        duration: 1000
      })
      return;
    }
    var data = {
      name: this.data.name, 
      tel: this.data.phoneNum, 
      identifyNo: this.data.idNum
    }
    util.dingRequest('wechatPay/unifiedOrder', 'POST', data).then((res) => {
      console.log('wechatPay/unifiedOrder接到参数：', res)
      var payParams = {
        "appId": res.appId,
        "timeStamp": res.timeStamp,
        "nonceStr": res.nonceStr,
        "package": res.package,
        "signType": res.signType,
        "paySign": res.paySign
      }
      console.log('发起支付的参数：', payParams)
      wx.requestPayment({
        ...payParams,
        success: (res) => {
          console.log('支付成功，微信返回值：', res)
          this.setData({
            isParter: true
          })
          wx.setStorageSync('isParter', true)
        },
        fail: (res) => {
          console.log('支付失败，微信返回值：', res)
        }
      })
    })
  },
  toRight: function() {
    wx.navigateTo({
      url: '/pages/partner/myPart/myPart'
    })
  },
  tojobItem: function(event) {
    console.log("去一个具体的岗位：", event)
    var jobId = event.currentTarget.dataset.jobid
    wx.navigateTo({
      url: '/pages/hotEnquiry/jobDetail/jobDetail?job_id=' + jobId,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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