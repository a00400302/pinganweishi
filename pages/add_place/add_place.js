// pages/edit_device/edit_device.js
var httpNetwork = require("../ApiHepler.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    place_name: null,
    place_area: null,
    place_location: null,
    lat:null,
    lng:null,
    place_type: null,
    array: ["公司企业",
      "工厂企业",
      "小作坊",
      "小商铺",
      "小娱乐场所",
      "娱乐场所",
      "出租屋",
      "宾饭馆",
      "学校",
      "其他"
    ],
    index: 0,
    strings: null,
    areaArray: null,
    areaindex: 0,
  },
  place_name: function (e) {
    var that = this
    var val = e.detail.value;
    that.setData({
      place_name: val
    });
  },
  place_area: function (e) {
    var that = this
    var val = e.detail.value;
    that.setData({
      place_area: val
    });
  },
  place_location: function (e) {
    var that = this
    var val = e.detail.value;
    that.setData({
      place_location: val
    });
  },
  place_type: function (e) {
    var that = this
    var val = e.detail.value;
    that.setData({
      place_type: val
    });
  },
  getIndex:function(arr, item) {
    var i = 0;
    for (i in arr) {
      if (arr[i] == item) {
        return i;
      };
    };
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    httpNetwork.getFireControlSmokeAreaList().then(res => {
      console.log(res)
      var areaString = [];
      var a = 0;
      for (a in res.data['data']['listArea']) {
        areaString.push(res.data['data']['listArea'][a]['name'])
      }
      console.log(areaString)

      this.setData({
        areaArray: res.data['data']['listArea'],
        strings: areaString
      })
    }).catch(res => {

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
    var i = this.getIndex(this.data.strings,this.data.place_area)
    var areaId = this.data.areaArray[i]['id'];
    console.log(this.data.lat)
		console.log(this.data.lng)
    if(this.data.lat == null ||  this.data.lng == null){
        wx.showToast({
          title: '请选择地址',
        })
    }else{
      var type = this.data.array.indexOf(this.data.place_type)
      httpNetwork.uploadPlace(this.data.place_name, this.data.place_location, this.data.place_area,this.data.place_location ,type , areaId, this.data.lat, this.data.lng).then(res => {
        wx.navigateBack({
          delta: 1,
        })
    }).catch(res => {

    })
    }
  },
  area: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      place_area: this.data.strings[e.detail.value]
    })
  },
  place_type: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      place_type: this.data.array[e.detail.value]
    })
  },
  map: function (e) {
    wx.navigateTo({
      url: '../../pages/place_map/place_map',
    })
  },

})