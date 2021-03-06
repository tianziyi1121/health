const app = getApp();
const api = require('../../../utils/api.js')
const toolTip = require('../../../utils/toolTip.js')
Page({
  data: {
    currentList: [],
    // 分页
    p: 1,
    num: 0,
    // 下拉刷新
    loadflag: false,
    // 上拉加载
    loadingFlag: true,
    flag: true
  },
  onLoad: function (options) {},
  onShow(){
    // 暂无数据组件
    this.noData = this.selectComponent("#noData")
    this.getData()
  },
  getData() {
    api.getMemberLogMoney({
      uid: app.globalData.uid,
      token: app.globalData.token,
      p: this.data.p
    }).then((res) => {
      if(res.status == 1){
        let pn = this.data.p - 1
        this.data.currentList[pn] = []
        this.data.num = res.data.length
        if (this.data.loadflag){
          this.setData({
            currentList: [],
            ['currentList[' + pn + ']']: res.data,
          })
        }else{
          this.setData({
            ['currentList[' + pn + ']']: res.data,
          })
        }
      }else{
        if (this.data.currentList.length < 1){
          this.noData.noData()
          this.setData({
            loadingFlag: true
          })
        }else{
          this.data.num = 0
          this.noData.noDataTrue()
        }
        toolTip.noPhotoTip(res.data.msg)
      }
      if (this.data.loadflag) {
        this.data.loadflag = !this.data.loadflag
        app.postpone()
      }
      if (this.data.num >= 8){
        this.setData({
          loadingFlag: false
        })
        this.load.onChange()
      }else{
        this.load.change();
      }
    })
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.data.loadflag = true
    this.data.p = 1
    this.setData({
      loadingFlag: true
    })
    this.load.onChange()
    this.getData()
  },
  // 上拉加载
  onReady() {
    this.load = this.selectComponent("#load")
  },
  onReachBottom() {
    let flag = true
    if (this.data.num < 10) {
      this.load.change();
      flag = false
    }
    setTimeout(() => {
      this.setData({
        loadingFlag: false
      })
    }, 100)
    if (flag) {
      this.data.flag = false
      this.data.p += 1
      this.getData()
    }
  }
})