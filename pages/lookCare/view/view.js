const app = getApp()
const api = require('../../../utils/api.js')
const toolTip = require('../../../utils/toolTip.js')
Page({
  data: {
    // 数据列表
    currentList: {},
    // 评价列表
    evaluateLIstanbul: {},
    imageFlag: false,
    // 收藏
    collection: 0,
    is_self: null,
    collectionFlag: null,
    // 好评
    starUrl: '../../../static/collect_block.png',
    halfUrl: '../../../static/icon_star_on_half@2x.png',
    greyUrl: '../../../static/collect.png',
    state:[0,1,2,3,4],
    id: null,
    // 是否可预约
    status: null,
    loginDataFlag: false,
    loginFlag: true
  },
  onLoad: function (options) {
    this.data.id = options.id
    // 暂无数据组件
    this.noData = this.selectComponent("#noData")
    if(app.globalData.uid == '') {
      this.noData.noData()
      this.setData({
        loginFlag: false
      })
      return false
    }
    this.getData(options.id)
  }, 
  onShow(){
    let flag = wx.getStorageSync('lookCare_list_flag')
    if (flag) {
      let data = wx.getStorageSync('lookCare_collect')
      this.setData({
        collection: data
      })
      data == 1 ? this.data.collectionFlag = true : this.data.collectionFlag = false
    }
    !this.data.loginFlag ? thisgetData(this.data.id) : ''
  },
  // 获取数据
  getData(id) {
    api.getNursingInfo({
      nursing_workers_id: id,
      uid: app.globalData.uid,
      token: app.globalData.token
    }).then((res) => {
      let data = res.data
      // data.info.praise_rate = data.info.praise_rate.toFixed(2)
      // this.setData({
      //   currentList: data.info,
      //   evaluateLIstanbul: data.comment,
      //   collection: data.is_collection,
      //   status: data.is_can_order,
      //   is_self: data.is_self
      // })
      // if (data.is_collection == 1) {
      //   this.data.collectionFlag = true 
      // }else{
      //   this.data.collectionFlag = false
      // }
    })
  },
  login() {
    this.setData({
      loginDataFlag: true
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
      loginDataFlag: false,
    })
  },
  // 预约
  subscribe(e) {
    // let phone = wx.getStorageSync('phone')
    // let btnFlag = wx.getStorageSync('btnFlag')
    // if (phone == '' || btnFlag == '') {
    //   this.login()
    //   return false
    // }
    // if (this.data.is_self != 1) {
    //   app.globalData.id = this.data.currentList.nursing_workers_id
    let time = Date.parse(new Date()) / 1000 + 7200
      wx.navigateTo({
        url: '/pages/subscribe/view/view?total=5488&orderType=1&timer='+ time
      })
    // } else {
    //   toolTip.photoTip('护工不能约自己', '../../../static/fail.png')
    // }
  },
  // 查看更多
  bindExamine(e) {
    wx.navigateTo({
      url: 'details/details?id=' + this.data.currentList.nursing_workers_id + '&money=' + this.data.currentList.nursing_workers_money + "&collection=" + this.data.collection + '&status=' + e.currentTarget.dataset.flag
    })
  },
  // 收藏
  bindCollect(){
    this.setData({
      imageFlag: !this.data.imageFlag
    })
    // let img = ''
    // let title = ''
    // let idx = 0
    // if (this.data.collectionFlag) {
    //   title = '取消收藏'
    //   img = '../../../static/fail.png'
    //   idx = 0
    //   this.data.collectionFlag = false
    // } else {
    //   title = '收藏成功'
    //   idx = 1
    //   this.data.collectionFlag = true
    // }
    // api.getMemberCollection({
    //   id: this.data.id,
    //   type: 1,
    //   uid: app.globalData.uid,
    //   token: app.globalData.token
    // }).then((res) => {
    //   if(res.status == 1){
    //     this.setData({
    //       collection: idx
    //     })
    //     wx.setStorageSync('lookCare_collect', idx)
    //     wx.setStorageSync('lookCare_list_flag', true)
    //     toolTip.photoTip(title, img)
    //   }else{
    //     toolTip.noPhotoTip(res.msg)
    //   }
    // })
  },
  // 分享
  onShareAppMessage() {
    return {
      title: app.share.name,
      path: 'pages/lookCare/view/view?id=' + this.data.id,
      success: res => {
        app.shareTip()
      }
    }
  },
})