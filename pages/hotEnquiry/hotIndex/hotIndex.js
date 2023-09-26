// pages/hotEnquiry/hotIndex/hotIndex.js
const app = getApp()
const util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height,
    cardList: [{
      imgSrc: "http://oss.umetrip.com/fs/serviceRecommend/1323,3a5ef964ec658103",
      targetUrl: ''
    },{
      imgSrc: "http://oss.umetrip.com/fs/serviceRecommend/530,31aa6c54d7ca46cd",
      targetUrl: ''
    }],
    dotsflag: false,
    tabList: [{
      text: "阜南",
      key: 1
    }, 
    // {
    //   text: "阜阳",
    //   key: 1
    // },
    {
      text: "芜湖",
      key: 3
    },{
      text: "合肥",
      key: 4
    }
    // ,{
    //   text: "滁州",
    //   key: 4
    // },{
    //   text: "郑州",
    //   key: 5
    // },{
    //   text: "安阳",
    //   key: 6
    // },{
    //   text: "衡阳",
    //   key: 7
    // }
    ],
    showDataList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // util.reqPost('area_job_list', data).then((res) => {
    //   console.log('接到参数：', res)
    //   this.render(res)
    // })
    if (this.data.cardList.length > 1) { // 广告图>1，则展示轮播效果
      this.setData({dotsflag: true})
    }
    this.getDatas(1, 1, 10)
  },
  getDatas: function(area_id, page_num, page_size) {
    var data = {area_id: area_id, page_num: page_num, page_size: page_size}
    util.reqPost('area_job_list', data).then((res) => {
      console.log('接到参数：', res)
      this.renderData(res, page_num)
    })
  },
  renderData: function(res, page_num) {
    res.forEach((item)=> {
      // item.features2 = '缴纳五险一金&&宿舍环境超好&&薪资待遇高'
      item.featureList = item.features.split('&&')
      item.logaUrl = util.getImageUrl(item.logo)
    })
    if (page_num == 1) {
      this.setData({
        showDataList: res
      })
    } else {
      this.showDataList.push(res)
      this.setData({
        showDataList: this.showDataList
      })
    }
    console.log("this.data.showDataList:", this.data.showDataList)
  },
  tabChangeHandle: function(event) {
    console.log("点击城市小导航条: ", event)
    var value = event.detail.value
    this.setData({cityValue: value})
    this.getDatas(value, 1, 10)
  },
  tojobItem: function(event) {
    console.log("去一个具体的岗位：", event)
    var jobId = event.currentTarget.dataset.jobid
    wx.navigateTo({
      url: '/pages/hotEnquiry/jobDetail/jobDetail?jobid=' + jobId,
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