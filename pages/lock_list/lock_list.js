// pages/lock_list/lock_list.js
var httpNetwork = require("../ApiHepler.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeid: '',
    owner: '',
    lockList: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.placeid);
    this.setData({
      placeid: options.placeid,
      owner: options.owner,
    })
    this.dialogConfirm = this.selectComponent('#dialogConfirm')
    this.binddialogConfirm = this.selectComponent('#binddialogConfirm')
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
    httpNetwork.doorLockList(this.data.placeid).then(res => {
        if (res.data['code'] == 0) {
          console.log(res.data['data']['doorLockList']);

          this.setData({
            lockList: res.data["data"]['doorLockList'],
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
  showDialog: function () {
    var that = this
    this.dialogConfirm.showNew({
      isShow: true,
      fail: function () {

      },
      success: function (place_id, sn, name) {
        console.log(place_id)
        console.log(sn)
        console.log(name)
        httpNetwork.addDoorLock(place_id, sn, name).then(res => {
            if (res.data['code'] == 0) {
              console.log(res.data['data']);

              wx.showToast({
                title: res.data['data'],
                icon: 'none'
              })
              setTimeout(function () {
                that.onShow()
              }, 1000)
            } else {
              wx.showToast({
                title: res.data['data'],
                icon: 'none'
              })
            }
          })
          .catch(res => {

          })
      }
    })
  },
  onRightImageTap: function (e) {
    this.showDialog();
  },

  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.lockList.forEach(function (v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      lockList: this.data.lockList
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
    that.data.lockList.forEach(function (v, i) {
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
      lockList: that.data.lockList
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
    // httpNetwork.deleteDevice(this.data.placeid, this.data.deviceList[e.currentTarget.dataset.index]['sn'])
    httpNetwork.deleteDoorLock(this.data.lockList[e.currentTarget.dataset.index]["id"])
    this.data.lockList.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      lockList: this.data.lockList
    })
  },
  bind: function (e) {
    this.bindshowDialog(this.data.lockList[e.currentTarget.dataset.index]["id"]);
  },
  bindshowDialog: function (deviceid) {
    var that = this
    this.binddialogConfirm.showNew({
      isShow: true,
      deviceid: deviceid,
      fail: function () {

      },
      success: function (deviceidS) {
        console.log(deviceidS)
        httpNetwork.updateDoorLock(deviceid, deviceidS).then(res => {
            if (res.data['code'] == 0) {
              console.log(res.data['data']);

              wx.showToast({
                title: res.data['data'],
                icon: 'none'
              })
              setTimeout(function () {
                that.onShow()
              }, 1000)
            } else {
              wx.showToast({
                title: res.data['data'],
                icon: 'none'
              })
            }
          })
          .catch(res => {

          })
      }
    })
  },
  play: function (e) {
    if (this.data.lockList[e.currentTarget.dataset.index]['status'] == 1) {

    } else {
      wx.showToast({
        title: '设备不在线',
      })
    }


  }
})