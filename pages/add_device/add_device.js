// pages/edit_device/edit_device.js
var httpNetwork = require("../ApiHepler.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    device_sn: "",
    placeId: "",
    device_name: "",
    device_location: "",
    start_time1: "",
    end_time1: "",
    start_time2: "",
    end_time2: "",
    tmp_check_time: "",
    sen_check_time: "",
    man_check_time: "",
    resend_check: "",
    warn_tem: "",
  },
  device_sn: function (e) {
    var that = this
    var val = e.detail.value;
    that.setData({
      device_sn: val
    });
  },
  device_name: function (e) {
    var that = this
    var val = e.detail.value;
    that.setData({
      device_name: val
    });
  },


  device_location: function (e) {
    var that = this
    var val = e.detail.value;
    that.setData({
      device_location: val
    });
  },


  start_time1: function (e) {
    var that = this
    var val = e.detail.value;
    that.setData({
      start_time1: val
    });
  },


  end_time1: function (e) {
    var that = this
    var val = e.detail.value;
    that.setData({
      end_time1: val
    });
  },

  start_time2: function (e) {
    var that = this
    var val = e.detail.value;
    that.setData({
      start_time2: val
    });
  },

  end_time2: function (e) {
    var that = this
    var val = e.detail.value;
    that.setData({
      end_time2: val
    });
  },

  tmp_check_time: function (e) {
    var that = this
    var val = e.detail.value;
    that.setData({
      tmp_check_time: val
    });
  },

  sen_check_time: function (e) {
    var that = this
    var val = e.detail.value;
    that.setData({
      sen_check_time: val
    });
  },

  man_check_time: function (e) {
    var that = this
    var val = e.detail.value;
    that.setData({
      man_check_time: val
    });
  },

  resend_check: function (e) {
    var that = this
    var val = e.detail.value;
    that.setData({
      resend_check: val
    });
  },


  warn_tem: function (e) {
    var that = this
    var val = e.detail.value;
    that.setData({
      warn_tem: val
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      placeId: options.placeId,
      device_sn:options.sn
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
  add: function () {
    httpNetwork.addFireDevice(
        this.data.placeId,
        this.data.device_sn,
        this.data.device_location,
        this.data.device_name,
        this.data.start_time1,
        this.data.end_time1,
        this.data.start_time2,
        this.data.start_time2,
        this.data.sen_check_time,
        this.data.man_check_time,
        this.data.resend_check,
        this.data.warn_tem,
        this.data.tmp_check_time,
      )
      .then(res => {
        if (res.data['code'] == 0) {
          wx.navigateBack({
            delta: 1,
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


  },  bindStarTime1Change: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      start_time1: e.detail.value
    })
  },  bindStarTime2Change: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      start_time2: e.detail.value
    })
  },
  bindEndTime1Change: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      end_time1: e.detail.value
    })
  },
  bindEndTime2Change: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      end_time2: e.detail.value
    })
  },
  
})