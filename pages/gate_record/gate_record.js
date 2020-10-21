// pages/gate_record/gate_record.js
var httpNetwork = require("../ApiHepler.js")


Page({


  /**
   * 页面的初始数据
   */
  data: {
      sn:null,
      record_data: null,
      record_data:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sn: options.SN,
    })


    console.log(this.data.sn);
    

    httpNetwork.getRecordBySn(this.data.sn).then(res =>{
        console.log(res)

        this.setData({
          record_data:res.data.data
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
  flash:function(e){
    httpNetwork.remoteShutDown(this.data.sn).then(res =>{
        console.log(res);
      
    }).catch(res =>{
      
    })
  }
})