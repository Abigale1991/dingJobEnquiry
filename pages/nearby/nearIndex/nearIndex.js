// pages/nearby/nearIndex/nearIndex.js
const app = getApp()
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    online: true,
    height: app.globalData.height,
    scrollHeight: 0,// 可滚动区域高度
    storeList: [], // 展示列表
    ownLng: '39.91305',
    ownLat: '116.3643',
    page_num: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getHeight()
  },
  onShow(options) {
    if (this.data.storeList.length < 1) {
      this.data.page_num = 1
      this.data.more = true
      this.getDatas(1, 10)
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
    var scrollHeight = allHeight - titleHeight
    this.setData({
      scrollHeight: scrollHeight
    })
  },
  getDatas: function(page_num, page_size) {
    var data = {lng: this.data.ownLng, lat: this.data.ownLat, page_num: page_num, page_size: page_size}
    util.dingRequest('around_recruitment_shops', 'GET', data).then((res) => {
      console.log('around_recruitment_shops接到参数：', res)
      this.renderData(res, page_num)
    }) 
  },
  togetMoreData: function(e) {
    console.log('加载更多', e)
    if (this.data.more) {
      this.getDatas(this.data.page_num, 10)
    }
  },
  renderData: function(res, page_num) {
    res.forEach((item)=> {
      // item.features2 = '缴纳五险一金&&宿舍环境超好&&薪资待遇高'
      // item.featureList = item.features.split('&&')
      item.distanceKm = parseFloat((item.distance / 1000).toFixed(1))
      item.avatarUrl = util.getImageUrl(item.avatar)
      this.data.storeList.push(item)
    })
    this.setData({
      storeList: this.data.storeList
    })
    if (res.length < 10) {
      this.data.more = false
    } else {
      this.data.page_num++
    }
  },
  toMakePhone: function(e) {
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel, //仅为示例，并非真实的电话号码
      success: ()=>{},
      fail: (err)=>{}
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  // /**
  //  * 生命周期函数--监听页面显示
  //  */
  // onShow() {

  // },

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