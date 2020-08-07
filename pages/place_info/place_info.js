// pages/place_info/place_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    owner: null,
    placeid: null,
    status: null,
    placeType: null,
    location: null,
    placeName: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.placeid)
    console.log(options.owner)
    console.log(options.placeType)
    console.log(options.location)
    console.log(options.placeName)
    console.log(options.status)
    this.setData({
      placeid: options.placeid,
      owner: options.owner,
      placeType: options.placeType,
      location: options.location,
      placeName: options.placeName,
      status: options.status,
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
  share: function (e) {
    wx.navigateTo({
      url: '/pages/place_share/place_share?placeId=' + this.data.placeid,
    })
  },
  onRightImageTap: function (e) {
    wx.navigateTo({
      url: '/pages/concat_edit/concat_edit?placeId=' + this.data.placeid+"&owner="+this.data.owner,
    })
  }
})