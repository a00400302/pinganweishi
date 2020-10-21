// pages/person/person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        isLogin:false,
        username:"",
        phone:"",
        type:"",
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
    var that=this;
    if(getApp().globalData.token != null){
      this.setData({
        isLogin:true
      })
    }
      wx.getStorage({
        key: 'user',
        success:function(user){
          that.setData({
            "username":user['data']['model']['name'],
            "phone":user['data']['model']['account'],
            "type":user['data']['model']['userType']
          });
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

  },
  place_edit: function () {
    wx.navigateTo({
      url: '/pages/place_edit/place_edit',
    })
  },
  push_edit: function () {
    wx.navigateTo({
      url: '/pages/push_edit/push_edit',
    })

  },
  history: function () {
    wx.navigateTo({
      url: '/pages/history/history',
    })

  },
  about: function () {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  }
})