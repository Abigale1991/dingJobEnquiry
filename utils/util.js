const app = getApp();
// const baseUrl = 'http://43.140.214.150:8088' // 测试地址
// const baseUrl = 'http://121.41.15.183:8088'
const baseUrl = 'https://m.fncyy.com'


function getToken(path, type, params) {
  wx.login({
    success: res => {
      console.log("获取wx.login的code:")
      console.log(res.code)
      var data = {code: res.code}
      dingRequest('wechat_login', 'POST', data).then((res) => {
        console.log('wechat_login接到参数：', res)
        wx.setStorageSync('token', res.token)
        wx.setStorageSync('isPartner', res.isPartner)
        if (path) {
          return dingRequest(path, type, params)
        }
      })
    }
  })
}
function dingRequest(path, type, params) {
  // 处理header
  var header = {
    'content-type': 'application/json' // 默认值
  }
  if(wx.getStorageSync('token') && wx.getStorageSync('token').length > 0) {
    header['token'] = wx.getStorageSync('token')
  }
  // 发出请求
  return new Promise((resolve, reject) => {
    // miniprog
    wx.request({
      url: baseUrl + '/api/employ/' + path,
      header: header,
      method: type,
      data: params,
      timeout: 20000,
      success: (res) => {
        console.log(path+'接口公共总返回参数：', res)
        if (res && res.data && res.data.errCode == 0) {
          resolve(res.data.data)
        } else if (res && res.data && res.data.errCode == 6) {
          return getToken(path, type, params)
        } else if (res && res.data && res.data.data) {
          wx.showModal({
            title: '提示',
            content: res.data.data,
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
      },
      fail: (err) => {
        console.log(path+'接口报错：', err)
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
  dingRequest,
  getImageUrl,
  getToken
}
