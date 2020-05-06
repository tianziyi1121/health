const app = getApp()
const api = require('../../../utils/api.js')
Page({
  data: {
    currentList: [],
    num: 0,
    p: 1,
    loadingFlag: true,
    topFlag: false,
    pn: 10,
    flag: true
  },
  onLoad() {
    this.getData()
    this.noData = this.selectComponent("#noData")
  },
  getData(url) {
    
  },
  // 下拉刷新
  onPullDownRefresh() {
    wx.showNavigationBarLoading()
    this.data.topFlag = true
    this.data.p = 1
    this.data.flag = true
    this.setData({
      loadingFlag: true
    })
    this.data.currentList = []
    this.getData(); 
  },
  // 上拉加载
  onReady() {
    this.load = this.selectComponent("#load")
  },
  onReachBottom() {
    let flag = true
    if (this.data.num < this.data.pn) {
      this.load.change();
      flag = false
    }
    this.data.flag = false
    setTimeout(() => {
      this.setData({
        loadingFlag: false
      })
    }, 100)
    if (flag) {
      this.data.p += 1
      this.getData()
    }
  },
  bindmessage(e) {
    app.globalData.currentList = this.data.currentList[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: 'view/view'
    })
  },
  // onShareAppMessage() {
  //   return {
  //     title: app.share.name,
  //     path: 'pages/user/message/message',
  //     success: res => {
  //       app.shareTip()
  //     }
  //   }
  // }
})