// pages/login.js
var httpNetwork = require("../ApiHepler.js")

Page({
  getPhoneNumber(e) {
    
    var that = this;
    console.log(e.detail.errMsg == "getPhoneNumber:ok");
    if (e.detail.errMsg == "getPhoneNumber:ok") {
            wx.getUserInfo({
              success:function(res){
                console.log(res)
                console.log(res.userInfo.nickName)
                console.log(res.userInfo.gender)
                console.log(that.data.openId)
                wx.request({
                  url: 'http://192.168.2.122:81/surpass/weix/userLogin',
                  data: {
                    encryptedData: e.detail.encryptedData,
                    iv: e.detail.iv,
                    sessionKey: that.data.session_key,
                    openId:that.data.openId,
                    nickName:res.userInfo.nickName,
                    gender:res.userInfo.gender,
                    
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  method: "POST",
                  success: function (res) {
                    console.log(res);
                  }
                })
              }
            })
    }
  },
  data: {
    openId:"",
    session_key: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 登录
    wx.login({
      success(res) {
        console.log(res);
        var code = res.code
        wx.request({
          url: 'http://192.168.2.122:81/surpass/weix/getOpenId',
          method: "get",
          data: {
            code
          },
          success: function (res) {
            console.log(res.data.data.openid);
            that.setData({
              openId:res.data.data.openid,
              session_key:res.data.data.session_key
            });
          }
        })
      }
    })
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
    wx.setNavigationBarColor({
      backgroundColor: '#fff',
      frontColor: '#000000',
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

  }
})