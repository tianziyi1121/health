const api = require("api.js")
// 获取屏幕高度
module.exports.windowHeight = function(){
  return new Promise((resolve, reject) => {
    wx.getSystemInfo({
      success: function (res) {
        let height = (res.windowHeight * (750 / res.windowWidth))
        resolve(height)
      }
    })
  })
} 
// 获取银行卡信息
module.exports.bankData = function (uid,token) {
  return new Promise((resolve,reject) => {
    api.getMemberBankEdit({
      token: token,
      uid: uid
    }).then((res) => {
      let type = null
      if (res.status == 1) {
        type = 1
        wx.setStorageSync('lsh_bankData', res.data)
      } else if (res.data.status == 2) {
        // 没绑卡
        type = 2
        wx.removeStorageSync('lsh_bankData')
      }
      resolve(type)
    })
  })
}
// 个人信息
module.exports.userData = function (uid, token) {
  return new Promise((resolve, reject) => {
    api.getMemberIndex({
      uid: uid,
      token: token
    }).then(res => {
      resolve(res)
    })
  })
}

// 图片处理
module.exports.imageStyle = function (data) {
  let html = data
    // .replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<p')
    // .replace(/<p>/ig, '<p style="font-size: 15Px; line-height: 25Px;">')
    .replace(/<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/ig, '<img$1')
    .replace(/<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/ig, '<img$1')
    .replace(/<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/ig, '<img$1')
    .replace(/<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/ig, '<img$1')
    .replace(/<img([\s\w"-=\/\.:;]+)/ig, '<img$1');
  html = html.replace(/<img/gi, "<img style='width:auto!important;height:auto!important; max-width:100%; margin: 10px 0 0 0 0;'");
  return html
}