// pages/inspection_edit/inspection_edit.js
var httpNetwork = require("../ApiHepler.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    equipmentPic1: "",
    equipmentPic2: "",
    equipmentPic3: "",
    isScan: null,
    deviceId: null,
    uploaderList: [],
    uploaderNum: 0,
    showUpload: true,
    isOk: 1,
    failCheck: false,
    OkCheck: true,
    remask: "",
    token: ""
  },

  // 删除图片
  clearImg: function (e) {
    var nowList = []; //新数据
    var uploaderList = this.data.uploaderList; //原数据

    for (let i = 0; i < uploaderList.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        continue;
      } else {
        nowList.push(uploaderList[i])
      }
    }
    this.setData({
      uploaderNum: this.data.uploaderNum - 1,
      uploaderList: nowList,
      showUpload: true
    })
  },
  //展示图片
  showImg: function (e) {
    var that = this;
    wx.previewImage({
      urls: that.data.uploaderList,
      current: that.data.uploaderList[e.currentTarget.dataset.index]
    })
  },
  //上传图片
  upload: function (e) {
    var that = this;
    wx.chooseImage({
      count: 3 - that.data.uploaderNum, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        let uploaderList = that.data.uploaderList.concat(tempFilePaths);
        if (uploaderList.length == 3) {
          that.setData({
            showUpload: false
          })
        }
        that.setData({
          uploaderList: uploaderList,
          uploaderNum: uploaderList.length,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      deviceId: options.deviceId,
      isScan: options.isScan
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
  sub: function (e) {
    // this.setData({
    //   token: getApp().globalData.token
    // })


    // var that = this
    // var i = 0;
    // for (i in this.data.uploaderList) {
    //    console.log(that.data.token)
    //   wx.uploadFile({
    //     filePath: this.data.uploaderList[i],
    //     name: "file",
    //     url: 'http://139.159.230.78/surpass/mobile/api/file/image',
    //     formData: {
    //       'token': that.data.token,
    //     },
    //     success(res) {
    //       console.log(res)
    //       // this.setData({
    //       //   equipmentPic1:this.data.uploaderList[0],
    //       //   equipmentPic2:this.data.uploaderList[1],
    //       //   equipmentPic3:this.data.uploaderList[2],
    //       // })      
    //     }
    //   })
    // }


    var type;
    if (this.data.isScan == 1) {
      type = 2
    } else {
      type = 1
    }
    var isok;
    if (this.data.isOk == 1) {
      isok = 1
    } else {
      isok = 2
    }

    console.log(this.data.remask)
    httpNetwork.getInformation(this.data.deviceId, type, this.data.remask, isok, this.data.equipmentPic1, this.data.equipmentPic2, this.data.equipmentPic3).then(res => {
      console.log(res)
      wx.navigateBack({
        delta: 1,
      })
    }).catch({

    })
  },
  radioChange: function (e) {
    console.log(e.detail.value)
    if (e.detail.value == "true") {
      this.setData({
        isOk: 1
      })
    } else {
      this.setData({
        isOk: 0
      })
    }
    console.log(this.data.isOk)
  },remask_input:function(e){
    this.setData({
      remask:e.detail.value
    })
  }


})