const app = getApp();
const baseUrl = 'http://43.140.214.150:8088'

function reqPost(path, params) {
  return new Promise((resolve, reject) => {
    // miniprog
    wx.request({
      url: baseUrl + '/api/employ/' + path,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      data: params,  // crypto.encryptAES(postData)
      timeout: 20000,
      success: (res) => {
        console.log('返回参数：', res)
        if (res && res.data && res.data.errCode == 0) {
          console.log('返回上层参数：', res.data.data)
          resolve(res.data.data)
        } else if (res && res.data && res.data.errMsg) {
          wx.showModal({
            title: '提示',
            content: res.data.errMsg,
            confirmText: '确定',
            showCancel: false,
            success(res) {}
          })
        } else if (res && res.errMsg) {
          wx.showToast({
            title: res.data.errMsg,
            icon: "none",
            duration: 2000,
            mask: true
          })
        }
        // if (res && res.data && res.data.presp && res.data.presp.perrcode == -1001011) {
        //   errRender(res.data.presp.perrmsg)
        // } else if (res && res.data && res.data.presp && res.data.presp.perrcode == -1001012) {
        //   wx.navigateTo({
        //     url: '/pages/web/index?H5Url='+ encodeURIComponent('https://static.umetrip.com/app/slideTest/index.html') + '&vericode=' + encodeURIComponent(JSON.stringify({type: 'clickWord'})),
        //   })
        // } else if (res && res.data && res.data.presp && res.data.presp.perrcode == 2) {
        //   console.log('res.data.presp.perrcode == 2')
        //   if (!app.globalData.isloginModal) {
        //     relogin(res.data.presp.perrmsg)
        //   }
        // } else if (res && res.data && res.data.presp && res.data.presp.perrmsg) {
        //   if (res && res.data && res.data.presp && res.data.presp.hinttype == 2) {
        //     resolve(res)
        //   } else {
        //     wx.showModal({
        //       title: '提示',
        //       content: res.data.presp.perrmsg,
        //       confirmText: '确定',
        //       showCancel: false,
        //       success(res) {}
        //     })
        //   }
        // } else if (res && res.data && res.data.perror && res.data.perror.pcode == 2) {
        //   console.log('res.data.perror.pcode == 2')
        //   if (!app.globalData.isloginModal) {
        //     relogin(res.data.perror.pmessage)
        //   }
        // } else {
        //   resolve(res)
        // }
      },
      fail: (err) => {
        console.log('接口报错', err)
        wx.showToast({
          title: '网络出错，请稍后重试',
          icon: "none",
          duration: 2000,
          mask: true
        })
        reject(err)
      },
      complete: (res) => {
        wx.hideLoading()
      }
    })
  })

}

function getImageUrl(imgName) {
  return baseUrl + '/static/' + imgName
}

module.exports = {
  reqPost,
  getImageUrl
}
