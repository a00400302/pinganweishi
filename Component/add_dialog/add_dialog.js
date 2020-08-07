// Component/add_dialog/add_dialog.js
Component({
  /**
   * 属性列表
   */
  properties: {
    title: {
      type: String,
      value: '标题'
    },
    content: {
      type: String,
      value: '内容'
    },
    list1: {
      type: Array,
      value: []
    },
    list2: {
      type: Array,
      value: []
    }
  },
  /**
   * 页面数据
   */
  data: {
    isShow: false,
    hand: function(){},
    qrCode: function(){}
  },
  /**
   * 方法
   */
  methods: {
    // ---------- 第一种事件回调 ----------
    /**
     * 关闭弹窗
     */
    close(){
      this.setData({
        isShow: false
      })
    },
    /**
     * 展示弹窗
     */
    show(){
      this.setData({
        isShow: true
      })
    },
    /**
     * 接收取消事件，并将事件bind到调用子组件上
     */
    _cancelEvent(){
      this.triggerEvent('cancelEvent');
    },
    _okEvent(){
      this.triggerEvent('okEvent');
    },
    // ---------- 第二种事件回调 ----------
    /**
     * 展示弹窗
     */
    showNew({ isShow = true, title = '标题', content = '内容', list1 = [], list2 = [], hand = null, qrCode = null }) {
      this.setData({
        isShow: isShow,
        title: title,
        content: content,
        list1: list1,
        list2: list2,
        hand: hand,
        qrCode: qrCode
      })
    },
    /**
     * 取消按钮点击
     */
    byhand(){
      this.close()
      this.data.hand()
    },
    /**
     * 确定按钮点击
     */
    byqrCode(){
      this.close()
      this.data.qrCode()
    }
  }
})