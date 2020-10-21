// pages/device_info/device_info.js
var httpNetwork = require("../ApiHepler.js")


Page({

  /**
   * 页面的初始数据
   */
  data: {
    device_id: null,
    devices_data: null,
    owner: null,
    options: null,
    lat: null,
    lng: null
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.device_id);
    console.log(options.lat);
    console.log(options.lng);
    this.setData({
      device_id: options.device_id,
      owner: options.owner,
      lat: options.lat,
      lng: options.lng,
      options: options,
    })


    this.dialogConfirm = this.selectComponent('#dialogConfirm')
  },

  showDialog: function () {
    this.dialogConfirm.showNew({
      isShow: true,
      success: function (device_id, owner, value) {
        httpNetwork.getFireControlSmokeDeal(device_id, value);
      },
    })
  },
  onRightImageTap: function () {
    wx.navigateTo({
      url: '../../pages/edit_device/edit_device?device_id=' + this.data.device_id,
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
    httpNetwork.getFireControlSmokeInfo(this.data.options.device_id).then(res => {
        if (res.data['code'] == 0) {
          console.log(res);

          this.setData({
            devices_data: res.data["data"],
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
    this.onShow(this.data.options)
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
  checkVideo: function () {
    wx.navigateTo({
      url: '../checkVideo/checkVideo',
    })
  },
  onDealButton: function (e) {
    this.showDialog();
  },
  okEvent: function (e) {
    this.onShow(this.data.options)
  },
  location: function (e) {
    console.log(this.data.lat);
    console.log(this.data.lng);
    var change = bMapToQQMap(Number(this.data.lat), Number(this.data.lng))
    // 打开地图
    wx.openLocation({
      latitude: Number(change[1]),
      longitude: Number(change[0]),
      scale: 28
    })
  },
  gate_record: function (e) {
    
    wx.navigateTo({
      url: '../gate_record/gate_record?SN=' + this.data.devices_data.sn,
    })
  }

})


function bMapToQQMap(lng, lat) {

  if (lng == null || lng == '' || lat == null || lat == '')

    return [lng, lat];

  var x_pi = 3.14159265358979324;

  var x = parseFloat(lng) - 0.0065;

  var y = parseFloat(lat) - 0.006;

  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);

  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);



  var lng = (z * Math.cos(theta)).toFixed(7);

  var lat = (z * Math.sin(theta)).toFixed(7);

  return [lng, lat];

}