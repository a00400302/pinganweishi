var httpNetwork = require("../ApiHepler.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeId: null,
    owner: 2,
    isEdit: 2,
    concatlist: [],
  },
  calltap: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.index;
    if (this.data.isEdit == 2) {
      wx.makePhoneCall({

        phoneNumber: this.data.concatlist[index].phone,
        success: function () {
          console.log("拨打电话成功！")
        },
        fail: function () {
          console.log("拨打电话失败！")
        }
      })
    } else {
      httpNetwork.operatingContact(this.data.concatlist[index].username,1,this.data.placeId).then(res => {
        wx.showToast({
          title: '删除成功',
        })
        this.onShow()
      }).catch(res => {

      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.placeId)
    console.log(options.owner)
    // console.log(__methodCaller)
    this.setData({
      placeId: options.placeId,
      owner: options.owner
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
    console.log(this.data.placeId)
    httpNetwork.queryContact(this.data.placeId).then(res => {
      this.setData({
        concatlist: res.data["data"]
      })
    }).catch(res => {
      console.log(res)
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
      wx.stopPullDownRefresh({
        success: (res) => {

        },
      })
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
    this.showDialog();  

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
    
  },
  qrCode: function () {
    if (this.data.isEdit == 2) {
      this.setData({
        isEdit: 1
      })
    } else {
      this.setData({
        isEdit: 2
      })
    }
  },
})