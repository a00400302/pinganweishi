// pages/fire_devices/fire_devices.js
var httpNetwork = require("../ApiHepler.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeid: '',
    deviceList: null,
    owner: null,
    options: null,
    startX: 0, //开始坐标
    startY: 0,
    lat:null,
    lng:null,
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
      lat:options.lat,
      lng:options.lng,
    })


    this.dialogConfirm = this.selectComponent('#dialogConfirm')
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
    httpNetwork.getFireControlListSmokeEquipment(this.data.options.placeid).then(res => {
        if (res.data['code'] == 0) {
          console.log(res);

          this.setData({
            deviceList: res.data["data"]["listSmokeEquipment"],
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
  tapDevice: function (event) {
    var index = event.currentTarget.dataset['index'];
    console.log(this.data.deviceList[index])
    console.log(this.data.deviceList[index])

    wx.navigateTo({
      url: '/pages/device_info/device_info?device_id=' + this.data.deviceList[index]["id"] + "&owner=" + this.data.owner + "&lat="+this.data.lat + "&lng="+ this.data.lng+"&dlat="+ this.data.deviceList[index]["lat"] +  "&dlng="+ this.data.deviceList[index]["lng"]
    })
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.deviceList.forEach(function (v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      deviceList: this.data.deviceList
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index, //当前索引
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });
    that.data.deviceList.forEach(function (v, i) {
      v.isTouchMove = false
      // 滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    // 更新数据
    that.setData({
      deviceList: that.data.deviceList
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除事件
  del: function (e) {
    httpNetwork.deleteDevice(this.data.placeid, this.data.deviceList[e.currentTarget.dataset.index]['sn'])
    this.data.deviceList.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      deviceList: this.data.deviceList
    })
  },
  onRightImageTap: function (e) {
    this.showDialog();
  },
  showDialog: function () {
    this.dialogConfirm.showNew({
      isShow: true,
      title: '温馨提示',
      content: '确定退出系统吗',
      list1: ['手动添加', "../../images/hand_add_bk.png"],
      list2: ['扫码添加', "../../images/scan_add_bk.png"],
      hand: this.hand,
      qrCode: this.qrCode
    })
  },
  hand: function () {
    console.log(this)
    console.log('手动')
    wx.navigateTo({
      url: '/pages/add_device/add_device?placeId='+this.data.placeid,
    })
  },
  qrCode: function () {
    var that = this
    wx.scanCode({
      success: (res) => {
        console.log(res)
        wx.navigateTo({
          url: '/pages/add_device/add_device?placeId='+that.data.placeid+"&sn="+res.result,
        })
      }
    })
    console.log(this)
    console.log('二维码')
  },


})