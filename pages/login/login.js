// pages/login.js
var httpNetwork = require("../ApiHepler.js")

Page({
  getPhoneNumber(e) {
    var that = this;
    console.log(e.detail.errMsg == "getPhoneNumber:ok");
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      wx.getUserInfo({
        success: function (res) {
          console.log(res)
          console.log(res.userInfo.nickName)
          console.log(res.userInfo.gender)
          console.log(that.data.openId)

          httpNetwork.userLogin(
            e.detail.encryptedData,
            e.detail.iv,
            that.data.session_key,
            that.data.openId,
            res.userInfo.nickName,
            res.userInfo.gender).then(res => {

            console.log(res.data.data.token);
            console.log(res.data.data.model.account);
            console.log(res.data.data.model.name);
            console.log(res);
            getApp().globalData.token = res.data.data.token;
            wx.setStorage({
              key: 'user',
              data: res.data['data'],
            })
            wx.switchTab({
              url: '/pages/fire/fire',
            })
          }).catch(res => {
            console.log(res.data.data.token);
          })
        }
      })
    }

    // httpNetwork.mobileUserLogin(this.data.phone,this.data.password).then(res =>{
    //                         console.log(res.data.data.token);
    //                 getApp().globalData.token = res.data.data.token;
    //                 wx.switchTab({
    //                   url: '/pages/fire/fire',
    //                 })
    // }).catch(res =>{
    //   wx.showToast({
    //     title: "密码或帐号不正确",
    //   })

    // })
  },
  bindGetUserInfo: function (e) {
    var that = this
    console.log(this.data.isCheck)
    if (this.data.isCheck) {
      this.setData({
        isShowLogin: true
      })
      wx.login({
        success(res) {
          console.log(res);
          var code = res.code
          httpNetwork.getOpenId(code).then(res => {
            console.log(res.data.data.openid);
            that.setData({
              openId: res.data.data.openid,
              session_key: res.data.data.session_key
            });
            wx.showToast({
              title: "再次点击登录"
            })
          }).catch(res => {

          })
          // wx.request({
          //   url: 'http://192.168.2.122:81/surpass/weix/getOpenId',
          //   method: "get",
          //   data: {
          //     code
          //   },
          //   success: function (res) {
          //     console.log(res.data.data.openid);
          //     that.setData({
          //       openId:res.data.data.openid,
          //       session_key:res.data.data.session_key
          //     });
          //   }
          // })
        }
      })

    } else {
      wx.showToast({
        title: "请同意协议"
      })
    }
  },
  checkboxChange: function (event) {
    console.log('checkbox发生change事件，携带value值为：', event.detail.value)
    if (event.detail.value[0] == "") {
      console.log('选中')
      this.setData({
        isCheck: true
      })
    } else {
      console.log('未选中')
      this.setData({
        isCheck: false
      })
    }

  },
  agreeUser: function (e) {
    wx.redirectTo({
      url: '/pages/User/User',
    })
  },
  agreePrivacy: function (e) {
    wx.redirectTo({
      url: '/pages/Privacy/Privacy',
    })
  },
  data: {
    isShowGet: false,
    isShowLogin: false,
    isCheck: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    openId: "",
    session_key: "",
    phone: "",
    password: "",
    items: [{
      name: 'USA',
      value: '美国',
      color: '#6699ff',
    }, ],
  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  password: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          isShowGet: false
        })

      },
      fail: function (res) {
        that.setData({
          isShowGet: true
        })
      }
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
    wx.setNavigationBarColor({
      backgroundColor: '#fff',
      frontColor: '#000000',
    })

    wx.getStorage({
      key: 'host',
      success: function (res) {
        console.log("testurl" + res.data)
        httpNetwork.setHost(res.data)
      },
      fail: function () {
        wx.navigateTo({
          url: '../setting/setting',
        })
      }
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
  setting: function (e) {
    wx.navigateTo({
      url: '../setting/setting',
    })
  }
})