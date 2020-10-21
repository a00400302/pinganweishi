// pages/fire/fire.js
var httpNetwork = require("../ApiHepler.js")



Page({


  /**
   * 页面的初始数据
   */
  data: {
    placelist: [],
    isEdit: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    this.dialogConfirm = this.selectComponent('#dialogConfirm')
  },
  showDialog: function () {
    this.dialogConfirm.showNew({
      isShow: true,
      title: '温馨提示',
      content: '确定退出系统吗',
      list1: ['添加', "../../images/hand_add_bk.png"],
      list2: ['删除', "../../images/scan_add_bk.png"],
      hand: this.hand,
      qrCode: this.qrCode
    })
  },
  hand: function () {
    wx.navigateTo({
      url: '/pages/add_place/add_place',
    })
  },
  qrCode: function () {
    console.log(this.data.isEdit)
    this.setData({
      isEdit: true,
    })
    console.log(this.data.isEdit)
  },
  onRightImageTap: function (e) {
    this.showDialog();
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
  tapPlace: function (event) {
    var index = event.currentTarget.dataset['index'];
    var radio = wx.createSelectorQuery("#checkradio")
    var thatList = this.data.placelist;
    console.log(radio)
    if (this.data.isEdit == true) {
      if (this.data.placelist[index]['placeimgurl'] == 0 || this.data.placelist[index]['placeimgurl'] == "0" || this.data.placelist[index]['placeimgurl'] == null) {
        thatList[index]['placeimgurl'] = 1
      } else {
        thatList[index]['placeimgurl'] = 0
      }
      this.setData({
        placelist: thatList,
        isEdit: true,
      })
    } else {
      wx.navigateTo({
        url: '/pages/place_info/place_info?placeid=' +
          this.data.placelist[index]["id"] +
          "&owner=" + this.data.placelist[index]["createType"] +
          "&location=" + this.data.placelist[index]['placeAddress'] +
          "&placeName=" + this.data.placelist[index]["placeName"] + 
          "&placeType=" + this.data.placelist[index]["administrativeRegions"] +
          "&status=" + this.data.placelist[index]["status"]
      })
    }

  },
  cancelTap: function (e) {
    this.setData({
      isEdit: false,
    })
  },
  deleteTap: function (e) {
    console.log(e)
    var that = this
    var i = 0;
    for (i in this.data.placelist) {
      var item = this.data.placelist[i]
      if (item["createType"] == 2 && item["placeimgurl"] == 1) {
        httpNetwork.deletePlace(item["id"]).then(res => {
          that.setData({
            isEdit: false,
          })
          that.onShow()
        }).catch(res => {

        })
      }
    }


  }


})