// pages/fire/fire.js
var httpNetwork = require("../ApiHepler.js")


Page({


  /**
   * 页面的初始数据
   */
  data: {
    isLogin:0,
    placelist:null,
  },
  changetologin: function(options){
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(this)

      this.dialogConfirm = this.selectComponent('#dialogConfirm')
  },
  showDialog: function(){
    this.dialogConfirm.showNew({
      isShow: true, 
      title: '温馨提示', 
      content: '确定退出系统吗', 
      cancelText: '取消', 
      okText: '确定', 
      hand: this.fail,
      qrCode: this.success,
    })
  },
  fail:function(){
    console.log(this)
    console.log('回调取消')
  },
  success:function(){
    console.log(this)
    console.log('回调成功')
  },
  onRightImageTap: function(e){
    console.log("tap")
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
    httpNetwork.getFireControlQueryPlace(2).then(res => {
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

  },inspectionTap:function(e){
      console.log(e)
      var index = e.currentTarget.dataset['index'];
      wx.navigateTo({
        url: '/pages/inspection_device/inspection_device?placeid=' + this.data.placelist[index]["id"] + "&owner=" + this.data.placelist[index]["createType"] + "&lat=" + this.data.placelist[index]['lat'] + "&lng=" + this.data.placelist[index]['lng'],
      })
  }


})