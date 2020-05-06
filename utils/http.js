/**
* 封装http 请求方法
*/
const apiUrl = "https://www.rqxfj.com/index.php"; //服务器api地址
// const apiUrl = "http://192.168.124.15:8000/"; //本地测试api地址

const http = (params) => {
  //返回promise 对象
  return new Promise((resolve, reject) => {
    wx.request({
      url: apiUrl + params.url,//服务器url+参数中携带的接口具体地址
      // url: apiUrl + params.url + '.json',//测试
      data: params.data,//请求参数
      header: params.header || {
        "Content-Type": "application/x-www-form-urlencoded"//设置后端需要的常用的格式就好，特殊情况调用的时候单独设置
      },
      method: params.method || 'GET',//默认为GET,可以不写，如常用请求格式为POST，可以设置POST为默认请求方式
      dataType: params.dataType,//返回的数据格式,默认为JSON，特殊格式可以在调用的时候传入参数
      responseType: params.responseType,//响应的数据类型
      success: function (res) {
        if (res.statusCode == 200) {
          // if (res.data.status == 1) {
            resolve(res.data)
          // } else {
          //   reject(res.data)
          //   if (res.data.msg) {
          //     wx.showToast({
          //       icon: "none",
          //       title: res.data.msg
          //     })
          //   }
          // }
        }
        if (res.statusCode == 500) {
          wx.hideLoading()
          console.log('服务器错误！')
        }
      },
      fail: function (e) {
        wx.hideLoading()
        errorToast('请求失败！');
        // reject(e)
      },
    })
  })
}

// 请求失败提示
function errorToast(errMsg) {
  if (!errMsg) return
  wx.showToast({
    icon: "none",
    title: errMsg
  })
}
module.exports = {
  http: http
}
