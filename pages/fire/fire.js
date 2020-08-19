// pages/fire/fire.js
var httpNetwork = require("../ApiHepler.js")



Page({


  /**
   * 页面的初始数据
   */
  data: {
    isLogin:0,
    placelist: null,
  },
  changetologin: function(e){
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    this.dialogConfirm = this.selectComponent('#dialogConfirm')
  },
  showDialog: function () {
    this.dialogConfirm.showNew({
      isShow: true,
      title: '温馨提示',
      content: '确定退出系统吗',
      list1: ['手动添加', "../../images/hand_add_bk.png"],
      list2: ['扫码添加', "../../images/scan_add_bk.png"],
      hand: this.hand,
      qrCode: this.qrCode
    })
  },
  hand: function () {
    console.log(this)
    console.log('手动')
    wx.navigateTo({
      url: '/pages/add_place/add_place',
    })
  },
  qrCode: function () {
    var that = this
    wx.scanCode({
      success: (res) => {
        console.log(res)
        httpNetwork.uploadQrPlace(res.result).then(res => {
            console.log(res)
            that.onShow()
        }).catch(res => {
            wx.showToast({
              title: '该场所已添加',
            })
        })
        
      }
    })
    console.log(this)
    console.log('二维码')
  },
  onRightImageTap: function (e) {
    this.showDialog();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(getApp().globalData.token != null){
      this.setData({
        isLogin:1
      })
    }
    httpNetwork.getFireControlQueryPlace(1).then(res => {
        if (res.data['code'] == 0) {
          console.log(res.data['data']['listPlace']);

          this.setData({
            placelist: res.data["data"]["listPlace"],
          })

        } else {
          wx.showToast({
            title: res.data['data'],
            icon: 'none'
          })
        }
      })
      .catch(res => {

      })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onShow();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tapPlace: function (event) {
    var index = event.currentTarget.dataset['index'];
    wx.navigateTo({
      url: '/pages/modules/modules?placeid=' + this.data.placelist[index]["id"] + "&owner=" + this.data.placelist[index]["createType"] + "&lat=" + this.data.placelist[index]['lat'] + "&lng=" + this.data.placelist[index]['lng'],
    })
  }


})