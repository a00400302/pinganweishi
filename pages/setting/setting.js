// pages/setting/setting.js
var httpNetwork = require("../ApiHepler.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '请选择服务器',
      icon:"none"
    })
    httpNetwork.server().then(res => {
      this.setData({
        list: res.data.data
      })
      console.log(res.data.data);
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
  changeServer: function (e) {
    var index = e.currentTarget.dataset.index
    var that = this
    wx.showModal({
      content: '确定切换服务器吗',
      showCancel: true,
      title: '选择服务器',
      success: (result) => {
        if (result.confirm) {
          wx.setStorage({
            data: that.data.list[index].serverUrl,
            key: 'host',
          })
          wx.navigateBack({
            delta: 1,
          })
        }
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  }
})