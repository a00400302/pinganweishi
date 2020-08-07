// Component/add_dialog/add_dialog.js
Component({
  /**
   * 属性列表
   */
  properties: {
    device_id: {
      type: String,
      value: '0'
    },
    owner: {
      type: String,
      value: '0'
    }
  },
  /**
   * 页面数据
   */
  data: {
    isShow: false,
    value:null,
    success: function () {},
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
      success = null
    }) {
      this.setData({
        isShow: isShow,
        success: success
      })
    },
    /**
     * 确定按钮点击
     */
    // _okClick() {
    //   this.close()
      
    // },
    _okClick(){
      var that  = this;
      this.close()
      this.data.success(this.properties.device_id,this.properties.owner,this.data.value)
      setTimeout(function(){
        var myEventDetail = {} // detail对象，提供给事件监听函数
        var myEventOption = {"composed":true} // 触发事件的选项
        that.triggerEvent('myevent', myEventDetail, myEventOption)
      },2000)
      
    }
    
  },
  swiperChange: function (e) {
    var that = this;
    var radioValue = e.detail.value;
    that.setData({
      value: radioValue
    })
  }
})