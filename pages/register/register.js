const app = getApp()
const api = require("../../utils/api.js")
const toolTip = require('../../utils/toolTip.js')
Page({
  data: {
    currentList: [],
    listIndex: 0,
    total: "0.00"
  },
  onLoad: function (options) {
    this.getData()
  },
  // 获取数据
  getData() {
   
  },
  bindList(e) {
    let data = e.currentTarget.dataset
    this.setData({
      listIndex: data.type,
      total: data.price
    })
  },
  bindOnce() {
    wx.navigateTo({
      url: '/pages/subscribe/view/view?total=' + this.data.total + "&orderType=2"
    })
  }
})