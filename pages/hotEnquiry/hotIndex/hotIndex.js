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
      // imgSrc: "http://oss.umetrip.com/fs/serviceRecommend/1323,3a5ef964ec658103",
      imgSrc: "../../../resources/images/banner.png",
      hot_job_id: ''
    }
    // ,{
    //   imgSrc: "http://oss.umetrip.com/fs/serviceRecommend/530,31aa6c54d7ca46cd",
    //   jobId: ''
    // }
    ],
    dotsflag: false,
    tabList: [
    // {
    //   text: "阜南",
    //   key: 1
    // },
    // {
    //   text: "芜湖",
    //   key: 3
    // },{
    //   text: "合肥",
    //   key: 4
    // }
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
    showDataList: [],
    tipsWord: '没有更多数据了',
    isTipsShow: false, // 提醒没有更多数据了
    page_num: 1,
    scrollHeight: 0,// 可滚动区域高度
    now_area_id: -1, // 当前城市
    page_size: 10, // 一次获取多少数据
    resData: [{"id":5,"jobName":"车间普工","salaryMax":10000,"salaryMin":6000,"ageMax":49,"ageMin":18,"features":"提拔速度快&&工作环境好&&缴纳五险一金","corporate":"弗迪科技线束工厂","addr":"安徽省阜阳市阜南县运河东路白领公寓西南侧约170米","logo":"fudikeji.png","corporatePics":"fudikeji1.jpg,fudikeji2.jpg,fudikeji3.jpg,fudikeji4.jpg","jobDescription":"招聘岗位: 车间普工\n工作内容：包胶、布线、打包等，工作简单，易上手。\n任职要求： 男18-49 女18- 47 男年龄不超49岁(含)，女年龄不超47岁（含）；体检合格（免费体检）。认识26个英语字母。身体健康吃苦耐劳做事积极责任心强。\n上班时间：点对点，两班倒，8.30-20:30，中午及下午吃饭，各休息一小时，实际工作时间10个小时左右，目前用工紧张，接受加班\n薪资待遇：入职购买社保，六个月后购买一金，社保企业及个人部分大约1500，公积金可以双倍提取；综合到手工资4500-8000，随着入职时间越长，有绩效奖，工龄奖等各种福利，工资收入逐步增长。8工资发放时间每月22号。\n工作地点：安徽省阜阳市阜南县运河东路白领公寓西南侧约170米","areaName":"安徽省 阜阳市"}]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.firstGetData()
    this.getHeight()
  },
  onShow() {
    if (this.data.showDataList.length < 1) {
      this.firstGetData()
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
  firstGetData: function() {
    // 获取城市列表
    util.dingRequest('area_list', 'GET', {}).then((res) => {
      console.log('area_list接到参数：', res)
      if (res && res.length > 0) {
        this.setData({
          tabList: res
        })
        // 获取岗位数据
        var firstAreaId = res[0].id
        this.setData({
          now_area_id: firstAreaId,
          page_num: 1
        })
        this.getDatas()
      }
    })
    // 获取banner热门岗位信息
    util.dingRequest('idx_config', 'GET', {areaId: 0}).then((res) => {
      console.log('idx_config接到参数：', res)
      var data = [{
        imgSrc: res.hot_job_img ? res.hot_job_img : "../../../resources/images/banner.png",
        hot_job_id: res.hot_job_id
      }]
      this.setData({
        cardList: data
      })
      if (this.data.cardList.length > 1) { // 广告图>1，则展示轮播效果
        this.setData({dotsflag: true})
      }
      // 其他数据放到合伙人页面使用
      if (res.hot_jobs && res.hot_jobs.length > 0) {
        res.hot_jobs.forEach((item)=> {
          // item.features2 = '缴纳五险一金&&宿舍环境超好&&薪资待遇高'
          item.featureList = item.features.split('&&')
          item.logaUrl = util.getImageUrl(item.logo)
        })
        app.globalData.hot_jobs = res.hot_jobs
      }
    })
  },
  getDatas: function() {
    var data = {area_id: this.data.now_area_id, page_num: this.data.page_num, page_size: this.data.page_size}
    util.dingRequest('area_job_list', 'GET', data).then((res) => {
      console.log('area_job_list接到参数：', res)
      // var temp = [],i = 0
      // for(i=0;i<10;i++) {
      //   temp.push(this.data.resData[0])
      // }
      // this.renderData(temp)
      this.renderData(res)
    })
  },
  togetMoreData: function(e) {
    console.log('触发去加载更多', e)
    this.getDatas()
  },
  renderData: function(res) {
    var showDataTemp = []
    if (res && res.length > 0){
      res.forEach((item)=> {
        // item.features2 = '缴纳五险一金&&宿舍环境超好&&薪资待遇高'
        item.featureList = item.features.split('&&')
        item.logaUrl = util.getImageUrl(item.logo)
        if (this.data.page_num == 1) {
          showDataTemp.push(item)
        } else {
          this.data.showDataList.push(item)
        }
      })
      if (this.data.page_num == 1) {
        this.setData({
          showDataList: showDataTemp
        })
      } else {
        // this.data.showDataList.push(res)
        this.setData({
          showDataList: this.data.showDataList
        })
      }
      this.setData({
        isTipsShow: false
      })
      this.data.page_num++
    } else {
      if (this.data.page_num == 1) {
        this.setData({
          showDataList: []
        })
      }
      this.setData({
        tipsWord: '没有查到更多数据',
        isTipsShow: true
      })
    }
    console.log("this.data.showDataList:", this.data.showDataList)
  },
  jumpToRecommend: function(e) {
    console.log(e)
    var hot_job_id = e.currentTarget.dataset.item.hot_job_id
    wx.navigateTo({
      url: '/pages/hotEnquiry/jobDetail/jobDetail?job_id=' + hot_job_id,
    })
  },
  tabChangeHandle: function(event) {
    console.log("点击城市小导航条: ", event)
    var area_id = event.detail.value
    this.setData({
      now_area_id: area_id
    })
    this.data.page_num = 1
    this.getDatas()
  },
  tojobItem: function(event) {
    console.log("去一个具体的岗位：", event)
    var jobId = event.currentTarget.dataset.jobid
    wx.navigateTo({
      url: '/pages/hotEnquiry/jobDetail/jobDetail?job_id=' + jobId,
    })
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