const app = getApp()
const api = require('../../utils/api.js')
const toolTip = require('../../utils/toolTip.js')
Page({
  data: {
    // loadingFlag lsh_order loginFlag
    // 弹窗
    titleFlag: null,
    shadowFlag: null,
    titleId: 0,
    coverUp: false,

    form: {
      uid: null,
      token: null,
      p: 1,
      titlePartId: '',
      collectId: ''
    },

    // 列表
    lookCareList: [],
    // 收藏
    collectUrl: '../../static/collect.png',
    collectBlockUrl: '../../static/collect_block.png',
    // 上拉加载
    loadingFlag: true,
    positionFlag: false,
    // 下拉刷新
    num: null,
    pn: 10,
    loadflag: false, 
    hasUserInfo: false,
    // 弹窗
    lsh_order: false,
    indextData: 10,
    onShowFlage: false,
    loginFlag: false,// login
    loadDataFlag: false
  },
  onLoad(options) {
    
  },
  onShow(){
    
  },
  rankData(){
    api.getNursingWorkers().then(res => {
      if (res.status == 1) {
        this.setData({
          rankList: res.data
        })
      } else {
        toolTip.noPhotoTip(res.msg)
      }
    })
  },
  // 扫码
  scanCode(){
    return new Promise((resolve,reject) => {
      let hospital = wx.getStorageSync('hospital')
      let department = wx.getStorageSync('department')
      if (hospital) {
        this.data.form.hospital = hospital
        this.data.form.department = department
      }
      resolve()
    })
  },
  // user login
  login() {
    this.setData({
      loginFlag: true
    })
  },
  // 点击按钮
  onBindLogin(e) {
    if (e.detail.type == 2) {
      wx.navigateTo({
        url: '/pages/index/index',
      })
    }
    this.setData({
      loginFlag: false,
    })
  },
  // 获取数据
  getData() {
    api.getNursingRank(this.data.form).then((res) => {
    
    })
  },
  
  // 预约
  subscribe: function(e) {
    let phone = wx.getStorageSync('phone')
    let btnFlag = wx.getStorageSync('btnFlag')
    if (phone == '' || btnFlag == '') {
      this.login()
      return false
    }
    let i = e.currentTarget.dataset.index
    let j = e.currentTarget.dataset.number
    let data = this.data.lookCareList[i][j]
    // if (((data.nursing_workers_relation == 1 && data.nursing_count < 1) || (data.nursing_workers_relation == 2 && data.nursing_count < 3))) {
    if (data.is_self != 1) {
      app.globalData.id = data.nursing_workers_id
      wx.navigateTo({
        url: '../lookCare/details/details'
      })
    } else {
      toolTip.photoTip('护工不能约自己', '../../static/fail.png')
    }
    // } else {
    //   toolTip.photoTip('暂时无法预约哟', '../../static/fail.png')
    // }
  },

  // title
  bindTitle(e) {
    let id = e.currentTarget.dataset.id
    if (this.data.titleId == id && this.data.shadowFlag){
      this.titleVanish()
    } else if (this.data.shadowFlag){
      this.setData({
        titleFlag: false,
        titleId: id
      })
      setTimeout(() => {
        this.setData({
          titleFlag: true
        })
      }, 500)
    } else {
      this.setData({
        titleId: id,
        coverUp: true,
        titleFlag: true,
        shadowFlag: true
      })
    }
    this.data.titleId = id
  },
  // title 消失
  titleVanish() {
    this.setData({
      titleFlag: false
    })
    setTimeout(() => {
      this.setData({
        shadowFlag: false,
        coverUp: false
      })
    }, 500)
  },
  bindPart(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      titlePartId: id
    })
    this.titleVanish()
  },
  // 筛选
  filtrate(){
    return new Promise((resolve, reject) => {
      this.setData({
        lookCareList: []
      })
    })
  },
  // 详情
  bindList(e) {
    let data = e.currentTarget.dataset
    // wx.setStorageSync('lookCare_i', data.index)
    // wx.setStorageSync('lookCare_j', data.number)
    wx.navigateTo({
      url: 'view/view?id='+ e.currentTarget.dataset.id
    })
  },
  // 收藏
  // bindCollect: function(e) {
  //   let i = e.currentTarget.dataset.index
  //   let j = e.currentTarget.dataset.number
  //   let id = e.currentTarget.dataset.id
  //   let img = ''
  //   let title = ''
  //   let idx = 0
  //   if (this.data.lookCareList[i][j].collection_count == 1){
  //     title = '取消收藏'
  //     img = '../../static/fail.png'
  //     idx = 0
  //   }else{
  //     title = '收藏成功'
  //     idx = 1
  //   }
  //   this.collectState(id).then((res) => {
  //     if(res.status == 1){
  //       this.setData({
  //         ['lookCareList[' + i + '][' + j + '].collection_count']: idx
  //       })
  //     }
  //     toolTip.photoTip(title, img)
  //   })
  // },
  // collect
  bindCollect(e) {
    let id = e.currentTarget.dataset.id
    this.data.collectId == id ? this.data.collectId = '' : this.data.collectId = id
    this.setData({
      collectId: this.data.collectId
    })
  },
  // 收藏接口
  collectState(id){
    return new Promise((resolve,reject) => {
      api.getMemberCollection({
        id: id,
        token: app.globalData.token,
        uid: app.globalData.uid,
        type: 1
      }).then((res) => {
        resolve(res)
      })
    })
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
    setTimeout(() => {
      this.setData({
        loadingFlag: false
      })
    }, 100)
    if (flag) {
      this.data.flag = false
      this.data.form.p += 1
      this.getData()
    }
  }, 
  // 页面滚动监听
  onPageScroll(e) {
    
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    
  },
  preventTouchMove(){},
  // 分享
  onShareAppMessage() {
    return {
      title: app.share.name,
      path: 'pages/lookCare/lookCare',
      success: res => {
        app.shareTip()
      }
    }
  },
  bindBuy() {
    let time = Date.parse(new Date())/1000 + 7200
    wx.navigateTo({
      url: '/pages/subscribe/view/view?total=5488&orderType=1&timer='+ time,
    })
  }
  // 
})