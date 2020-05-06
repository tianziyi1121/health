const app = getApp()
const api = require("../../utils/api.js")
const toolTip = require('../../utils/toolTip.js')
Page({
  data: {
    currentList: [],
    // 总价
    total: '',
    totalId: [],
    typeFlag: null,
    id: '',
    type: '',
    orderRemarks: '',
    valueFlag: true
  },
  onLoad: function(options) {
    options.value == 1 ? this.data.valueFlag = false : ''
    if (options.type == 1){
      this.data.typeFlag = false
      this.data.id = options.ids
    }else{
      this.data.typeFlag = true
    }
    this.data.type = options.type
    this.setData({
      valueFlag: this.data.valueFlag,
      typeFlag: this.data.typeFlag
    })
    this.getData(options.num, options.ids, options.type)
  },
  // 获取数据
  getData(num,ids,type) {
    api.getOrderConfirm({
      num: num,
      ids: ids,
      type: type,
      uid: app.globalData.uid,
      token: app.globalData.token
    }).then((res) => {
      if(res.status == 1) {
        if(res.data.length > 0){
          let data = res.data
          data.map(item => {
            item.pro_num = Number(item.pro_num)
          })
          this.setData({
            currentList: data
          })
          this.totalMoney()
        }else{
          toolTip.noPhotoTip('亲、暂无数据')
        }
      }
    })
  },
  // min
  orderMin: function(e) {
    var index = e.currentTarget.dataset.index
    if (!this.data.typeFlag && this.data.currentList[index].pro_num > 1){
      this.data.currentList[index].pro_num -= 1
    } else if (this.data.typeFlag && this.data.currentList[index].carts_num > 1){
      this.data.currentList[index].carts_num -= 1
    } else {
      toolTip.noPhotoTip('亲、最少购买1件哦')
    }
    this.totalMoney()
  },
  // add
  orderAdd: function(e) {
    var index = e.currentTarget.dataset.index
    if (!this.data.typeFlag) {
      this.data.currentList[index].pro_num += 1
    } else {
      this.data.currentList[index].carts_num += 1
    }
    this.data.currentList[index].carts_num += 1
    this.totalMoney()
  },
  // 总价
  totalMoney: function(e) {
    var money = 0
    var arr = []
    this.data.currentList.map(item => {
      if (!this.data.typeFlag){
        money += item.pro_num * item.pro_price
      }else{
        money += item.carts_num * item.carts_product_price
      }
      arr.push(item.id)
    })
    this.setData({
      total: money.toFixed(2),
      currentList: this.data.currentList,
      totalId: arr
    })
  },
  // 地址
  orderBind(e) {
    this.data.orderRemarks = e.detail.value
  },
  // 提交订单
  bindOrder() {
    let ids = ''
    let num = ''
    let id = ''
    if (!this.data.typeFlag){
      id = this.data.id,
      num = this.data.currentList[0].pro_num
      ids = ''
    }else{
      this.data.currentList.map(item => {
        ids += item.carts_id + ","
        num += item.carts_num + ","
      })
      id = ''
    }
    if (!this.data.orderRemarks){
      toolTip.photoTip('备注不能为空', '../../static/fail.png')
      return false
    }
    let list = {
      type: this.data.type,
      uid: app.globalData.uid,
      token: app.globalData.token,
      num: num,
      orderType: 1,
      orderSrc: "wechat",
      ids: ids,
      id: id,
      orderRemarks: this.data.orderRemarks
    }
    api.getRdersSubOrder(list).then((res) => {
      if(res.status == 1){
        wx.navigateTo({
          url: '../subscribe/view/view?total=' + this.data.total + '&id=' + res.data.order_id + '&timer=' + res.data.createTime +'&orderType=1'
        })
      }else{
        toolTip.photoTip('提交失败', '../../static/fail.png')
      }
    })
  }
  // // 分享
  // onShareAppMessage() {
  //   return {
  //     title: app.share.name,
  //     path: 'pages/order/order',
  //     success: res => {
  //       app.shareTip()
  //     }
  //   }
  // }
})