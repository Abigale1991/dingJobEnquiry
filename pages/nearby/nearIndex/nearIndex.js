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
    storeList: [], // 展示列表
    ownLng: '39.91305',
    ownLat: '116.3643'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow(options) {
    this.getDatas(1, 10)
  },

  getDatas: function(page_num, page_size) {
    var data = {lng: this.data.ownLng, lat: this.data.ownLat, page_num: page_num, page_size: page_size}
    util.dingRequest('around_recruitment_shops', 'GET', data).then((res) => {
      console.log('around_recruitment_shops接到参数：', res)
      this.renderData(res, page_num)
    }) 
  },

  renderData: function(res, page_num) {
    res.forEach((item)=> {
      // item.features2 = '缴纳五险一金&&宿舍环境超好&&薪资待遇高'
      // item.featureList = item.features.split('&&')
      item.distanceKm = parseFloat((item.distance / 1000).toFixed(1))
      // item.logaUrl = util.getImageUrl(item.logo)
    })
    if (page_num == 1) {
      this.setData({
        storeList: res
      })
    } else {
      this.storeList.push(res)
      this.setData({
        storeList: this.storeList
      })
    }
    console.log("this.data.showDataList:", this.data.showDataList)
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