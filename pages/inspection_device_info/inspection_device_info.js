var httpNetwork = require("../ApiHepler.js")
Page({
  data: {
    device_name:null,
    deview_type:null,
    place_name:null,
    device_location:null,
    device_status:null,
    device_id:null,
    record_list:null,
    isScan:null,
    menuList: [{
      name: "设备详情"
    }, {
      name: "巡检记录"
    }],
    tabScroll: 0,
    currentTab: 0,
   
  },
  onLoad: function(options) {

    this.setData({
      device_id:options.device_id,
      deview_type:options.deview_type,
      place_name:options.place_name,
      device_location:options.device_location,
      device_status:options.device_status,
      device_name:options.device_name,
      isScan:options.isScan
    })
    




    wx.getSystemInfo({ // 获取当前设备的宽高，文档有
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
  },
  onReady: function() {
   
  },
  //点击tab menu
  clickMenu: function(e) {
    var current = e.currentTarget.dataset.current; //获取当前tab的index
    // 导航tab共5个，获取一个的宽度
    var tabWidth = this.data.windowWidth / 5;
    this.setData({
      tabScroll: (current - 2) * tabWidth//使点击的tab始终在居中位置
    })
    if (this.data.currentTab == current) {
      return false
    } else {
      this.setData({
        currentTab: current
      })
    }
  },
  //活动menu 内容
  changeContent: function(e) {
    var current = e.detail.current // 获取当前内容所在index,文档有
    var tabWidth = this.data.windowWidth / 5
    this.setData({
      currentTab: current,
      tabScroll: (current - 2) * tabWidth
    })
  },
  onShow:function(){
    httpNetwork.getInspectionRecord(this.data.device_id,1).then(res =>{
        console.log(res.data.data.listPlace.list)
        this.setData({
          record_list:res.data.data.listPlace.list
        })
    }).catch(res =>{

    })
  },onPullDownRefresh:function(){
    this.onShow()
    wx.stopPullDownRefresh()
  },onRightImageTap:function(){
    var that =this
      if(this.data.isScan == 1){
        wx.navigateTo({
          url: '/pages/inspection_edit/inspection_edit?isScan=1'+"&deviceId="+that.data.device_id,
        })
      }else{
        wx.scanCode({
          success:function(res){
            wx.navigateTo({
              url: '/pages/inspection_edit/inspection_edit?isScan=0'+"&deviceId="+that.data.device_id,
            })  
          }
        })
      }
  }
  

})