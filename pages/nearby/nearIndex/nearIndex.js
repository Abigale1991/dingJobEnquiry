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
    ownLng: '', // 维度
    ownLat: '', // 经度
    getLocation: false,
    page_num: 1,
    page_size: 10,
    isTipsShow: false, // 提醒没有更多数据了
    tipsWord: '加载更多'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getHeight()
    // if (wx.getStorageSync('ownLng')) {
    //   this.setData({
    //     isApprove: true
    //   })
    // } else {
    //   this.setData({
    //     isApprove: false
    //   })
    // }
  },
  onShow(options) {
    if (!this.data.getLocation) {
      wx.getLocation({
        success: (res) => {
          var latitude = res.latitude // 获取纬度
          var longitude = res.longitude //获取经度
          console.log('获取地理位置成功：', latitude,longitude)
          this.setData({
            ownLng: latitude,
            ownLat: longitude,
            getLocation: true //位置获取成功
          })
          this.setData({
            page_num: 1,
            isTipsShow: false
          })
          this.getDatas()
        },
        fail: (err) => {
          console.log('获取地理位置失败：', err)
          if (this.data.storeList.length < 1) {
            this.setData({
              page_num: 1,
              isTipsShow: false
            })
            this.getDatas()
          }
        }
      })
    } else {
      if (this.data.storeList.length < 1) {
        this.setData({
          page_num: 1,
          isTipsShow: false
        })
        this.getDatas()
      }
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
  getDatas: function() {
    this.setData({
      isTipShow: false
    })
    var data = {lng: this.data.ownLng, lat: this.data.ownLat, page_num: this.data.page_num, page_size: this.data.page_size}
    console.log('around_recruitment_shops接口入参:', data)
    util.dingRequest('around_recruitment_shops', 'GET', data).then((res) => {
      console.log('around_recruitment_shops接到参数：', res)
      this.renderData(res)
    }) 
  },
  togetMoreData: function(e) {
    console.log('触发去加载更多', e)
    this.getDatas()
  },
  renderData: function(res) {
    if (res && res.length > 0) {
      res.forEach((item)=> {
        // item.features2 = '缴纳五险一金&&宿舍环境超好&&薪资待遇高'
        // item.featureList = item.features.split('&&')
        item.distanceKm = item.distance ? parseFloat((item.distance / 1000).toFixed(1)) : -1
        item.avatarUrl = util.getImageUrl(item.avatar)
        this.data.storeList.push(item)
      })
      this.setData({
        storeList: this.data.storeList,
        // tipsWord: '加载更多',
        // isTipsShow: true
      })
      this.data.page_num++
    } else {
      this.setData({
        tipsWord: '没有查到更多数据',
        isTipsShow: true
      })
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