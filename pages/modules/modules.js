// pages/modules/modules.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      placeid:'',
      owner:null,
      lat:null,
      lng:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.placeid);
    console.log(options.owner);
    console.log(options.lat);
    console.log(options.lng);
    this.setData({
      placeid:options.placeid,
      owner:options.owner,
      lat:options.lat,
      lng:options.lng,
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
  devices: function () {
    wx.navigateTo({
      url: '../../pages/fire_devices/fire_devices?placeid='+this.data.placeid+"&owner="+this.data.owner + "&lat="+this.data.lat + "&lng="+ this.data.lng,
    })
    console.log("devices");  
  },
  cameras: function () {
    wx.navigateTo({
      url: '../../pages/camera_list/camera_list?placeid='+this.data.placeid+"&owner="+this.data.owner + "&lat="+this.data.lat + "&lng="+ this.data.lng,
    })
    console.log("cameras");
  },
  locks: function () {
    wx.navigateTo({
      url: '../../pages/lock_list/lock_list?placeid='+this.data.placeid+"&owner="+this.data.owner + "&lat="+this.data.lat + "&lng="+ this.data.lng,
    })
    console.log("locks");
  },
  door: function () {
    wx.navigateTo({
      url: '../../pages/door_list/door_list?placeid='+this.data.placeid+"&owner="+this.data.owner + "&lat="+this.data.lat + "&lng="+ this.data.lng,
    })
    console.log("door");
  }
})