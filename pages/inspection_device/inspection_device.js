// pages/inspection_device/inspection_device.js
var httpNetwork = require("../ApiHepler.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceList: null,
    placeid: null,
    owner: null,
    options: null,
    lat: null,
    lng: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.placeid);
    console.log(options.lat);
    console.log(options.lng);

    this.setData({
      placeid: options.placeid,
      owner: options.owner,
      options: options,
      lat: options.lat,
      lng: options.lng,
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
    httpNetwork.getInspectionDeviceList(this.data.options.placeid).then(res => {
        if (res.data['code'] == 0) {
          console.log(res);

          this.setData({
            deviceList: res.data["data"]["listFirefightingEquipmenForMoble"],
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
    this.onShow()
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
  onRightImageTap: function (e) {
    var that = this
    wx.scanCode({
      success: function (res) {
        console.log(res.result)
        httpNetwork.getInspectionScanDeviceList(res.result).then(r =>{
          
          wx.navigateTo({
            url: '/pages/inspection_device_info/inspection_device_info?device_id=' +
            r.data.data.model["id"] +
              "&deview_type=" + r.data.data.model["eqType"] +
              "&place_name=" + r.data.data.model["placeName"] +
              "&device_location=" + r.data.data.model["location"] +
              "&device_status=" + r.data.data.model["isQualified"] +
              "&device_name=" + r.data.data.model["equipmentName"] +
              "&isScan=1"
          })
        }).catch(r => {

        })

      }
    })
  },
  deviceTap: function (e) {
    var index = e.currentTarget.dataset['index'];
    wx.navigateTo({
      url: '/pages/inspection_device_info/inspection_device_info?device_id=' +
        this.data.deviceList[index]["id"] +
        "&deview_type=" + this.data.deviceList[index]["eqType"] +
        "&place_name=" + this.data.deviceList[index]["placeName"] +
        "&device_location=" + this.data.deviceList[index]["location"] +
        "&device_status=" + this.data.deviceList[index]["isQualified"] +
        "&device_name=" + this.data.deviceList[index]["equipmentName"] + 
        "&isScan=0"
    })
  }
})