// Component/push_item/push_item.js
var http

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    place_name: {
      type: String,
      value: ""
    },
    call_push: {
      type: Boolean,
      value: false
    },
    sms_push: {
      type: Boolean,
      value: false
    },
    onClick:{
      type:Function,
      value:function(){

      }
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
  }
})