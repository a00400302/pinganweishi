// pages/push_edit/push_edit.js
var httpNetwork = require("../ApiHepler.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placelist: [],
    onClick:function(){
      
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    httpNetwork.getFireControlQueryPlace(1).then(res => {
      if (res.data['code'] == 0) {
        console.log(res.data['data']['listPlace']);

        this.setData({
          placelist: res.data["data"]["listPlace"],
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
    this.onShow();
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
  _okClick:function(e){
    var item = this.data.placelist[e.target.dataset.index]
    httpNetwork.setPushSetting(item.id,item.callSwitch,item.smsSwitch).then(res =>{
      console.log(res)
    }).catch(res => {

    })
      console.log(e)
  },
  changeSms:function(e){
    if(this.data.placelist[e.target.dataset.index].smsSwitch == 1){
      this.data.placelist[e.target.dataset.index].smsSwitch = 0
    }else{
      this.data.placelist[e.target.dataset.index].smsSwitch = 1
    }
    console.log(this.data.placelist[e.target.dataset.index].smsSwitch)

  },
  changeCall:function(e){
    if(this.data.placelist[e.target.dataset.index].callSwitch == 1){
      this.data.placelist[e.target.dataset.index].callSwitch = 0
    }else{
      
      this.data.placelist[e.target.dataset.index].callSwitch = 1
    }
    console.log(this.data.placelist[e.target.dataset.index].callSwitch)
  }
})
