// Component/add_dialog/add_dialog.js
Component({
  /**
   * 属性列表
   */
  properties: {
      placeId:{
        type:String,
        value:null,
      }
  },
  /**
   * 页面数据
   */
  data: {
    isShow: false,
    device_sn: null,
    device_name: null,
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
      success = null
    }) {
      this.setData({
        isShow: isShow,
        cancelText: cancelText,
        okText: okText,
        fail: fail,
        success: success
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
      })
    },
    /**
     * 确定按钮点击
     */
    _okClick() {
      this.close()
      this.data.success(this.properties.placeId,this.data.device_sn,this.data.device_name)
      this.setData({
        device_name: "",
        device_sn: "",
      })
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
  
  
  }
})