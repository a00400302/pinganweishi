// Component/titleBar/titleBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title_text:{
      "type":"String",
      "value": 'title'
    },
    icon_display:{
      "type":"String",
      "value":"none"
    },

    icon_src:{
      "type":"String",
      "value": '../../images/add_wh.png'
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function(){
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {"composed":true} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    }

  }
})
