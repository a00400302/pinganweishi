// // pages/map/map.js

var x_PI = 3.14159265358979324;
var bmap = require('../../utils/bmap-wx.js')
var wxMarkerData = [];
var BMap = new bmap.BMapWX({
	ak: 't0fpZz4c1LbGLp0SGTipfDpxK2r2CMeb'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:40.0511,
    longitude:116.30051,
    markers: []
  },
  toaddress: function (e) {
    console.log(this.data.lat);
    console.log(this.data.lng);
    var change = bd09togcj02(Number(this.data.longitude),Number(this.data.latitude))
    // 打开地图
    wx.openLocation({
      // latitude: Number(change[1]),z
      // longitude: Number(change[0]),
      latitude:Number(this.data.latitude),
      longitude:Number(this.data.longitude),
      scale: 20
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var change = bd09togcj02(Number(options.longitude),Number(options.latitude))
    this.setData({
      latitude:Number(change[1]),
      longitude:Number(change[0]),
      markers: [
        {
          id: 1,
          latitude: Number(change[1]),
          longitude: Number(change[0]),
          height:35,
          width:20,
          callout:{
            content: "设备位置",
            padding:10,
            // anchorY:-30,
            display:'ALWAYS',
            textAlign:'center',
            // borderRadius: 10,
            // borderColor:'#ff0000',
            // borderWidth: 2,
          }
   
        }]
    })
    console.log(this.data.latitude)
    console.log(this.data.longitude)
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

  }
  
})
function bd09togcj02(bd_lng, bd_lat) {
  var bd_lng = +bd_lng;
  var bd_lat = +bd_lat;
  var x = bd_lng - 0.0065;
  var y = bd_lat - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_PI);
  var gg_lng = z * Math.cos(theta);
  var gg_lat = z * Math.sin(theta);
  return [gg_lng, gg_lat]
};



