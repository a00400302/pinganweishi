// Component/add_dialog/add_dialog.js
var httpNetwork = require("../../pages/ApiHepler.js")
Component({
  /**
   * 属性列表
   */
  properties: {
    placeId: {
      type: String,
      value: null,
    }
  },
  /**
   * 页面数据
   */
  data: {
    toView: '#6699ff',
    bindlist: null,
    isShow: false,
    device_sn: null,
    device_name: null,
    device_check_code: null,
    fail: function () {},
    success: function () {}
  },


  /**
   * 方法
   */
  methods: {
    // ---------- 第一种事件回调 ----------
    /**
     * 关闭弹窗
     */
    close() {
      this.setData({
        isShow: false
      })
    },
    /**
     * 展示弹窗
     */
    show() {
      this.setData({
        isShow: true
      })
    },
    /**
     * 接收取消事件，并将事件bind到调用子组件上
     */
    _cancelEvent() {
      this.triggerEvent('cancelEvent');
    },
    _okEvent() {
      this.triggerEvent('okEvent');
    },
    // ---------- 第二种事件回调 ----------
    /**
     * 展示弹窗
     */
    showNew({
      isShow = true,
      cancelText = '取消',
      okText = '确定',
      fail = null,
      deviceid = null,
      success = null
    }) {
      console.log(this.properties.placeId)
      console.log(this.properties.deviceId)
      httpNetwork.deviceBindDoorLockList(this.properties.placeId,deviceid).then(res => {
          if (res.data['code'] == 0) {
            console.log(res.data['data']['deviceBindList']);

            this.setData({
              isShow: isShow,
              bindlist: res.data['data']['deviceBindList'],
              cancelText: cancelText,
              okText: okText,
              fail: fail,
              success: success
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
     * 取消按钮点击
     */
    _cancelClick() {
      this.close()
      this.data.fail()
      this.setData({
        device_name: "",
        device_sn: "",
        device_check_code: ""
      })
    },
    /**
     * 确定按钮点击
     */
    _okClick() {
      this.close()

      var devices = "";
      var a;
      for (a in this.data.bindlist) {
        
        if (this.data.bindlist[a]["checked"] == 1) {
          devices += this.data.bindlist[a]["id"] +","
        }
      }
      this.data.success(devices)
    },
    device_name: function (e) {

      var that = this
      var val = e.detail.value;
      console.log(val);
      that.setData({
        device_name: val
      });
    },

    device_sn: function (e) {
      var that = this
      var val = e.detail.value;
      console.log(val);
      that.setData({
        device_sn: val
      });
    },

    device_check_code: function (e) {
      var that = this
      var val = e.detail.value;
      console.log(val);
      that.setData({
        device_check_code: val
      });
    },





    upper(e) {
      console.log(e)
    },

    lower(e) {
      console.log(e)
    },

    scroll(e) {
      console.log(e)
    },

    scrollToTop() {
      this.setAction({
        scrollTop: 0
      })
    },

    tap() {
      for (let i = 0; i < order.length; ++i) {
        if (order[i] === this.data.toView) {
          this.setData({
            toView: order[i + 1],
            scrollTop: (i + 1) * 200
          })
          break
        }
      }
    },

    tapMove() {
      this.setData({
        scrollTop: this.data.scrollTop + 10
      })
    },
    switchChange(e) {
      if (e.detail.value) {
        this.data.bindlist[e.target.dataset.index]['checked'] = 1
      } else {
        this.data.bindlist[e.target.dataset.index]['checked'] = 0
      }
      console.log(this.data.bindlist)
    }



  }
})