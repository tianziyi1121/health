import {
  http
} from 'http.js' 

var url = {
  // home
  index: "/api/index",
  nursingInfo:"/api/nursing_workers/nursing_workers_info",
  nursingYuyue: "/api/nursing_workers/nursing_workers_yuyueinfo",
  confirmYuyue: "/api/member/confirm_yuyue",
  // lookcare
  nursingWorkers: "/api/nursing_workers/nursing_workers_lists",
  nursingRank: "/api/nursing_workers/nursing_rank",
  // indent
  memberOrders: "/api/member/my_orders",
  memberDel: "/api/member/order_del",
  refundIndex: "/api/Refund/index",
  // product
  productList: "/api/product/product_list",
  productCont: "/api/product/product_cont",
  cartsAdd: "/api/carts/add_carts",
  memberCollection: "/api/member/collection",
  // user
  memberIndex: "/api/member/index",
  member: "/api/member/service_type_edit",
  memberBankEdit: "/api/Member/bank_edit", 
  memberupdateBank: "/api/Member/update_bank",
  memberWithdrawalEdit: "/api/Member/withdrawal_edit",
  memberWithdrawal: "/api/Member/withdrawal",
  memberLogMoney: "/api/member/log_money",
  loginSendsms: "/api/Login/sendsms",
  rdersSubOrder: "/api/orders/sub_order",
  // shopping
  cartsIndex: "/api/carts/index",
  cartsNum: "/api/carts/change_carts_num",
  cartsDel: "/api/carts/carts_del",
  orderConfirm: "/api/orders/order_confirm",
  payIndex: "/api/Pay/index",
  // login
  loginNumber: "/api/login/getTelNumber",
  loginGetinfo: "/api/login/getinfo"
}
module.exports = {
  // home
  getIndex(data) {
    return http({
      url: url.index,
      data: data
    })
  },
  getNursingInfo(data) {
    return http({
      url: url.nursingInfo,
      data: data
    })
  },
  getNursingYuyue(data) {
    return http({
      url: url.nursingYuyue,
      data: data
    })
  },
  getConfirmYuyue(data) {
    return http({
      url: url.confirmYuyue,
      data: data
    })
  },
  // lookcare
  getNursingWorkers(data) {
    return http({
      url: url.nursingWorkers,
      data: data
    })
  },
  getNursingRank(data) {
    return http({
      url: url.nursingWorkers,
      data: data
    })
  },
  // user
  getMemberIndex(data) {
    return http ({
      url: url.memberIndex,
      data: data
    })
  },
  getMember(data) {
    return http({
      url: url.member,
      data: data
    })
  },
  getMemberBankEdit(data) {
    return http({
      method: "post",
      url: url.memberBankEdit,
      data: data
    })
  },
  getMemberupdateBank(data) {
    return http({
      method: "post",
      url: url.memberupdateBank,
      data: data
    })
  },
  getMemberWithEdit(data) {
    return http({
      method: "post",
      url: url.memberWithdrawalEdit,
      data: data
    })
  },
  getLoginSendsms(data) {
    return http({
      method: "post",
      url: url.loginSendsms,
      data: data
    })
  },
  getMemberWithdrawal(data) {
    return http({
      method: "post",
      url: url.memberWithdrawal,
      data: data
    })
  },
  getRdersSubOrder(data) {
    return http({
      method: "post",
      url: url.rdersSubOrder,
      data: data
    })
  },
  getMemberLogMoney(data) {
    return http({
      url: url.memberLogMoney,
      data: data
    })
  },
  // shoppingg
  getCartsIndex(data) {
    return http({
      url: url.cartsIndex,
      data: data
    })
  }, 
  getCartsNum(data) {
    return http({
      method: "post",
      url: url.cartsNum,
      data: data
    })
  },
  getCartsDel(data) {
    return http({
      method: "post",
      url: url.cartsDel,
      data: data
    })
  }, 
  getOrderConfirm(data) {
    return http({
      url: url.orderConfirm,
      data: data
    })
  },
  getPayIndex(data) {
    return http({
      method: "post",
      url: url.payIndex,
      data: data
    })
  },
  // indent
  getMemberOrders(data) {
    return http({
      url: url.memberOrders,
      data: data
    })
  }, 
  getMemberDel(data) {
    return http({
      url: url.memberDel,
      data: data
    })
  },
  getRefundIndex(data) {
    return http({
      url: url.refundIndex,
      data: data
    })
  },
  // product 
  getProductList(data) {
    return http({
      url: url.productList,
      data: data
    })
  },
  getProductCont(data) {
    return http({
      url: url.productCont,
      data: data
    })
  },
  //
  getCartsAdd(data) {
    return http({
      method: "post",
      url: url.cartsAdd,
      data: data
    })
  },
  getMemberCollection(data) {
    return http({
      method: "post",
      url: url.memberCollection,
      data: data
    })
  },
  // login
  getLoginNumber(data) {
    return http({
      method: "post",
      url: url.loginNumber,
      data: data
    })
  },
  getLoginGetinfo(data) {
    return http({
      method: "post",
      url: url.loginGetinfo,
      data: data
    })
  },
}


// module.exports.requestServerData = function (url, method, data,flag) {
//   return new Promise(function (resolve, reject) {
//     if (flag){
//       wx.showLoading({
//         title: '拼命加载中~~~',
//       })
//     }
//     let header = {}
//     if (method == 'get'){
//       header= {
//         'content-type': 'application/json'
//       }
//     }else{
//       header = {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     }
//     wx.request({
//       url: "https://www.rqxfj.com/index.php" + url,
//       data: data,
//       header: header,
//       method: method,
//       success: function (res) {
//         resolve(res)
//         if (flag){
//           setTimeout(() => {
//             wx.hideLoading()
//           }, 500)
//         }
//       },
//       fail: function (res) {
//         reject(res)
//         setTimeout(() => {
//           wx.hideLoading()
//         }, 500)
//       }
//     })
    
//   })
// }