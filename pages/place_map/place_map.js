// map.js
// var QQMapWX = require('../../../../utils/qqmap-wx-jssdk.js')
// var demo = new QQMapWX({
// 	key: 'eee-eee-eee-eeee-eee' //申请的Key
// })


var bmap = require('../../utils/bmap-wx.js')
var wxMarkerData = [];
var BMap = new bmap.BMapWX({
	ak: 't0fpZz4c1LbGLp0SGTipfDpxK2r2CMeb'
});
Page({


	data: {
		latitude: null,
		longitude: null,
		markers: null,
		sugData: null,
		saLat: null,
		saLng: null,
		inputText: null,
	},
	onLoad: function (options) {
		var that = this
		wx.getLocation({
			type: 'gcj02',
			success: function (res) {
				that.setData({
					latitude: res.latitude,
					longitude: res.longitude,
					markers: [{
						id: 0,
						latitude: res.latitude,
						longitude: res.longitude,
						width: 50,
						height: 50
					}]
				})


			}
		})
	},

	// 视图发生改变，修改中心点
	mapchangeTap: function () {
		// 中心点
		let that = this;
		this.mapCtx = wx.createMapContext('map');
		this.mapCtx.getCenterLocation({
			success(res) {
				console.log(res)
				that.analysisTap(res.latitude, res.longitude)
			}
		})
	},
	// 地址逆解析
	analysisTap: function (lat, lng) {
		let that = this;
		that.setData({
			saLat: lat,
			saLng: lng
		})
		// 新建百度地图对象 

		var fail = function (data) {
			console.log(data)
		};
		var success = function (data) {
			wxMarkerData = data.wxMarkerData;
			console.log(data)
			that.setData({
				inputText: wxMarkerData[0].address
			});

		}
		// 发起regeocoding检索请求 
		BMap.regeocoding({
			location: lat + ',' + lng,
			fail: fail,
			success: success,
		});
	},
	bindKeyInput: function (e) {
		var that = this;
		var fail = function (data) {
			console.log(data)
		};
		var success = function (data) {
			console.log(data.result)
			that.setData({
				sugData: data.result,
			});
		}
		// 发起suggestion检索请求 
		BMap.suggestion({
			query: e.detail.value,
			// region: '北京', 
			// city_limit: true, 
			fail: fail,
			success: success
		});
	},
	sugTap: function (e) {
		var data = this.data.sugData[e.currentTarget.dataset.index]
		this.setData({
			latitude: data.location.lat,
			longitude: data.location.lng,
			saLat: null,
			saLng: null
		})
		var that = this
		setTimeout(function () {
			that.setData({
				inputText: data.name,
			})
		}, 150)

	},
	select: function (e) {
		console.log(this.data.latitude)
		console.log(this.data.longitude)
		var pages = getCurrentPages();
		var prevPage = pages[pages.length - 2]; //上一个页面
		if (this.data.saLat != null && this.data.saLng != null) {
			prevPage.setData({
				place_location: this.data.inputText,
				lat: this.data.latitude,
				lng: this.data.longitude
			})
			wx.navigateBack({ //返回
				delta: 1
			})
		} else {
			console.log("null")

			//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
			prevPage.setData({
				place_location: this.data.inputText,
				lat: this.data.latitude,
				lng: this.data.longitude
			})
			wx.navigateBack({ //返回
				delta: 1
			})
		}
	}
})