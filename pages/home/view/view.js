const app = getApp();
const common = require('../../../utils/common.js')
Page({
  data: {
    currentData: ''
  },
  onLoad: function (options) {
    this.getData()
  },
  getData() {
    let data = app.globalData.bindImage
    data.menu_content = common.imageStyle(data.menu_content)
    wx.setNavigationBarTitle({
      title: data.menu_name
    })
    this.setData({
      currentData: data
    })
  },
  bindBtn() {
    wx.switchTab({
      url: '../../lookCare/lookCare'
    })
  }
})