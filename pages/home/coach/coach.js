Page({
  data: {
    // 弹窗
    titleFlag: null,
    shadowFlag: null,
    titleId: 0,
    titlePartId: '',
    coverUp: false,
    collectId: '',
  },
  onLoad: function (options) {

  },
  bindList(e) {
    let data = e.currentTarget.dataset
    wx.navigateTo({
      url: 'view/view',
    })
  },
  // title
  bindTitle(e) {
    let id = e.currentTarget.dataset.id
    if (this.data.titleId == id && this.data.shadowFlag) {
      this.titleVanish()
    } else if (this.data.shadowFlag) {
      this.setData({
        titleFlag: false,
        titleId: id
      })
      setTimeout(() => {
        this.setData({
          titleFlag: true
        })
      }, 500)
      setTimeout(() => {
        this.setData({
          coverUp: false
        },700)
      })
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
        shadowFlag: false
      })
    }, 500)
    setTimeout(() => {
      this.setData({
        coverUp: false
      })
    },700)
  },
  bindPart(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      titlePartId: id
    })
    this.titleVanish()
  },
  // collect
  bindCollect(e) {
    let id = e.currentTarget.dataset.id
    this.data.collectId == id ? this.data.collectId = '' : this.data.collectId = id
    this.setData({
      collectId: this.data.collectId
    })
  },
  // bindBuy
  bindBuy() {
    wx.navigateTo({
      url: '/pages/subscribe/subscribe',
    })
  }
})