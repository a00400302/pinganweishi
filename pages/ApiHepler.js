var host = "http://139.159.230.78/surpass/mobile"
var image_host = "http://139.159.230.78/surpass"

const configApi = {
    //用户登录
    mobileUserLogin: function (account, pwd) {
        var urlStr = `${host}/mobileUserLogin`

        var parameters

        parameters = {
            account: account,
            pwd: pwd,
            pushToken: ""

        }

        return postRequest(urlStr, parameters)
    },

    //请求烟感场所列表
    getFireControlQueryPlace: function ( placeType) {
        var urlStr = `${host}/queryPlaceByUserId`

        var parameters

        parameters = {
            token: getApp().globalData.token,
            placeType: placeType,
        }

        return postRequest(urlStr, parameters)
    },

    //查看烟感设备地图信息
    getFireControlListSmokeEquipment: function ( placeId) {
        var urlStr = `${host}/queryListSmokeEquipment`

        var parameters

        parameters = {
            token: getApp().globalData.token,
            placeId: placeId
        }

        return postRequest(urlStr, parameters)
    },

    // 请求烟感设备详情
    getFireControlSmokeInfo: function ( id) {
        var urlStr = `${host}/fireDeviceInfo`

        var parameters

        parameters = {
            token: getApp().globalData.token,
            id: id,
        }

        return postRequest(urlStr, parameters)
    },
    getAccessToken: function () {
        var urlStr = `${host}/getAccessToken`

        var parameters

        parameters = {
            token: getApp().globalData.token,
        }

        return postRequest(urlStr, parameters)
    },
    getFireControlSmokeDeal: function ( deviceId, operCode) {
        var urlStr = `${host}/dealSmokeEvent`

        var parameters

        parameters = {
            token: getApp().globalData.token,
            deviceId: deviceId,
            operCode: operCode

        }

        return postRequest(urlStr, parameters)
    },
    getFireControlSmokeAreaList: function () {
        var urlStr = `${host}/fireArea`

        var parameters

        parameters = {
            token: getApp().globalData.token,
        }

        return postRequest(urlStr, parameters)
    },



    getFireControlSmokeMessage: function (pageNum) {
        var urlStr = `${host}/fireDeviceMsg`

        var parameters

        parameters = {
            token: getApp().globalData.token,
            pageNum: pageNum,
        }

        return postRequest(urlStr, parameters)
    },
    uploadPlace: function ( placeName, placeAddress, administrativeRegions, mapAddress, placeType, areaId, mapLat, mapLnt) {
        var urlStr = `${host}/addFirePlace`

        var parameters

        parameters = {
            token: getApp().globalData.token,
            placeName: placeName,
            placeAddress: placeAddress,
            administrativeRegions: administrativeRegions,
            mapAddress: mapAddress,
            placeType: placeType,
            areaId: areaId,
            lat: mapLat,
            lat: mapLnt,
        }

        return postRequest(urlStr, parameters)
    },
    uploadQrPlace: function ( qrCode) {
        var urlStr = `${host}/addFirePlaceQr`

        var parameters

        parameters = {
            token: getApp().globalData.token,
            qrCode: qrCode,
        }

        return postRequest(urlStr, parameters)
    },
    getQrCode: function ( placeId) {
        var urlStr = `${host}/getQrCode`

        var parameters

        parameters = {
            token: getApp().globalData.token,
            placeId: placeId,
        }

        return postRequest(urlStr, parameters)
    },
    deletePlace: function (placeId) {
        var urlStr = `${host}/deleteFirePlace`
        var parameters

        parameters = {
            token: getApp().globalData.token,
            placeId: placeId,
        }

        return postRequest(urlStr, parameters)
    },
    deleteDevice: function ( placeId, deviceSn) {
        var urlStr = `${host}/delFireDevice`

        var parameters

        parameters = {
            token: getApp().globalData.token,
            placeId: placeId,
            deviceSn: deviceSn
        }

        return postRequest(urlStr, parameters)
    },
    queryContact: function ( placeId) {
        var urlStr = `${host}/queryContact`

        var parameters

        parameters = {
            token: getApp().globalData.token,
            placeId: placeId,
        }

        return postRequest(urlStr, parameters)
    },
    operatingContact: function ( account, type, placeId) {
        var urlStr = `${host}/operatingContact`

        var parameters

        parameters = {
            account: account,
            type: type,
            placeId: placeId,
            token: getApp().globalData.token,
        }

        return postRequest(urlStr, parameters)
    },
    addFireDevice: function (placeId, deviceSn, installationLocation, deviceName,startTime, endTime, startTime2, endTime2, ygSensitivity, checkTime, repeatTime, temperatureWarn, rtSensitivity) {
        var urlStr = `${host}/addFireDevice`

        var parameters

        parameters = {
            placeId: placeId,
            deviceSn: deviceSn,
            installationLocation: installationLocation,
            deviceName: deviceName,
            token: getApp().globalData.token,
            startTime: startTime,
            endTime: endTime,
            startTime2: startTime2,
            endTime2: endTime2,
            ygSensitivity: ygSensitivity,
            checkTime: checkTime,
            repeatTime: repeatTime,
            temperatureWarn: temperatureWarn,
            rtSensitivity: rtSensitivity,
        }

        return postRequest(urlStr, parameters)
    },
    setPushSetting: function ( id, callSwitch, smsSwitch) {
        var urlStr = `${host}/pushManager`

        var parameters

        parameters = {
            token: getApp().globalData.token,
            id: id,
            callSwitch: callSwitch,
            smsSwitch: smsSwitch

        }

        return postRequest(urlStr, parameters)
    },
    setDevice: function (id, placeId, deviceSn, installationLocation, deviceName, ygSensitivity, checkTime, repeatTime, temperatureWarn, rtSensitivity, startTime, endTime, startTime2, endTime2) {
        var urlStr = `${host}/updateFireDevice`

        var parameters

        parameters = {
            id: id,
            placeId: placeId,
            deviceSn: deviceSn,
            installationLocation: installationLocation,
            deviceName: deviceName,
            ygSensitivity: ygSensitivity,
            // checkTime: checkTime,
            repeatTime: repeatTime,
            temperatureWarn: temperatureWarn,
            rtSensitivity: rtSensitivity,
            token: getApp().globalData.token,
            startTime: startTime,
            endTime: endTime,
            startTime2: startTime2,
            endTime2: endTime2,
        }

        return postRequest(urlStr, parameters)
    },
    getCameraList: function (placeId) {
        var urlStr = `${host}/cameraList`

        var parameters

        parameters = {
            token: getApp().globalData.token,
            placeId: placeId
        }

        return postRequest(urlStr, parameters)
    },
    deleteCamera: function (id) {
        var urlStr = `${host}/deleteCamera`

        var parameters

        parameters = {
            token: getApp().globalData.token,
            id: id,
        }

        return postRequest(urlStr, parameters)
    },
    addCamera: function ( placeId, deviceSerial, validateCode, cameraName) {
        var urlStr = `${host}/addCamera`

        var parameters

        parameters = {
            token: getApp().globalData.token,
            placeId: placeId,
            deviceSerial: deviceSerial,
            validateCode: validateCode,
            cameraName: cameraName,
        }

        return postRequest(urlStr, parameters)
    },
    deviceBindList: function ( id, placeId) {
        var urlStr = `${host}/deviceBindList`

        var parameters

        parameters = {
            token: getApp().globalData.token,
            id: id,
            placeId: placeId
        }

        return postRequest(urlStr, parameters)
    },
    updateCamera: function ( id, deviceIds) {
        var urlStr = `${host}/updateCamera`

        var parameters

        parameters = {
            token: getApp().globalData.token,
            id: id,
            deviceIds: deviceIds

        }

        return postRequest(urlStr, parameters)
    },

    // 联系人修改 ：updatePlaceUser 参数：1.token 2.placeId 3.arr（姓名-电话）  方式：POST 
    updatePlaceUser: function ( placeId, arr) {
        var urlStr = `${host}/updatePlaceUser`

        var parameters

        parameters = {
            token: getApp().globalData.token,
            placeId: placeId,
            arr: arr

        }

        return postRequest(urlStr, parameters)
    },
    


    userLogin: function ( placeId, arr) {
        var urlStr = `${image_host}/weix/userLogin`
        var parameters
        parameters = {
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            sessionKey: that.data.session_key,
            userEncryptedData:res.encryptedData,
            useriv:res.iv,
        }

        return postRequest(urlStr, parameters)
    },
    

    getOpenId: function (code) {
        var urlStr = `${image_host}/weix/getOpenId`
        var parameters
        parameters = {
            code
        }
        return getRequest(urlStr, parameters)
    },






    getInspectionDeviceList: function ( placeId) {
        var urlStr = `${host}/queryListEquipmentByPlaceId`

        var parameters

        parameters = {
            token: getApp().globalData.token,
            placeId: placeId

        }

        return postRequest(urlStr, parameters)
    },
    getInspectionScanDeviceList: function ( onlyUuId) {
        var urlStr = `${host}/queryInspectionDeviceByQr`

        var parameters

        parameters = {
            token: getApp().globalData.token,
            onlyUuId: onlyUuId,
        }

        return postRequest(urlStr, parameters)
    },
    getInspectionRecord: function ( id, pageNum) {
        var urlStr = `${host}/getSixMonthRemark`

        var parameters

        parameters = {
            token: getApp().globalData.token,
            id: id,
            pageNum: pageNum

        }

        return postRequest(urlStr, parameters)
    },
    getInformation: function (id, type,remark,isQualified,equipmentPic1,equipmentPic2,equipmentPic3) {
        var urlStr = `${host}/pushCheckInform`

        var parameters

        parameters = {
            token:getApp().globalData.token,
            type:type,
            id:id,
            remark:remark,
            isQualified:isQualified,
            equipmentPic1:equipmentPic1,
            equipmentPic2:equipmentPic2,
            equipmentPic3:equipmentPic3,

        }

        return postRequest(urlStr, parameters)
    },
    upLoadImage: function (file, token) {
        var urlStr = `${image_host}/"api/file/image"`

        var parameters

        parameters = {
            token: getApp().globalData.token,
            file: file,
        }

        return postRequest(urlStr, parameters)
    },










    deviceBindDoorLockList: function ( placeId,id) {
        var urlStr = `${host}/deviceBindDoorLockList`

        var parameters

        parameters = {
            token: getApp().globalData.token,
            placeId: placeId,
            id:id

        }

        return postRequest(urlStr, parameters)
    },
    doorLockList: function ( placeId) {
        var urlStr = `${host}/doorLockList`

        var parameters

        parameters = {
            token: getApp().globalData.token,
            placeId: placeId

        }

        return postRequest(urlStr, parameters)
    },
    updateDoorLock: function ( id,deviceIds) {
        var urlStr = `${host}/updateDoorLock`

        var parameters

        parameters = {
            token: getApp().globalData.token,
            id: id,
            deviceIds:deviceIds

        }

        return postRequest(urlStr, parameters)
    },
    addDoorLock: function ( placeId,doorLockSn,doorLockName) {
        var urlStr = `${host}/addDoorLock`

        var parameters

        parameters = {
            token: getApp().globalData.token,
            placeId: placeId,
            doorLockSn:doorLockSn,
            doorLockName:doorLockName
        }

        return postRequest(urlStr, parameters)
    },
    deleteDoorLock: function ( id) {
        var urlStr = `${host}/deleteDoorLock`

        var parameters

        parameters = {
            token: getApp().globalData.token,
            id: id

        }

        return postRequest(urlStr, parameters)
    },
    getCtrInfo: function () {
        var urlStr = `${host}/getCtrInfo`

        var parameters

        parameters = {
            token: getApp().globalData.token,
        }

        return postRequest(urlStr, parameters)
    },
    remoteDoorOpening: function () {
        var urlStr = `${host}/remoteDoorOpening`

        var parameters

        parameters = {
            token: getApp().globalData.token,

        }

        return postRequest(urlStr, parameters)
    },

}

module.exports = configApi

/**
 * POST类型的网络请求
 */
function postRequest(urlStr, parameters) {
    return httpRequest(urlStr, parameters, 'POST')
}

/**
 * GET类型的网络请求
 */
function getRequest(urlStr, paramerers) {
    return httpRequest(urlStr, paramerers, 'GET')
}


function httpRequest(urlStr, paramerers, method) {
    return new Promise((resolve, reject) => {
        wx.showLoading({
            title: '请求中...',
        })
        wx.request({
            url: urlStr,
            data: paramerers,
            method: method,
            header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
            success: (res => {
            const isSuccess = isHttpSuccess(res.statusCode)
            if (isSuccess) {

                console.log('url =', urlStr)
                console.log('request success', res)
                
                if(res.data['code'] == null || res.data['code']  ==  undefined){
                    wx.showToast({
                        title: res.data['msg'],
                        icon: 'none'
                    })
                }
                
                if (res.data['code'] != 0) {
                    wx.showToast({
                        title: res.data['data'],
                        icon: 'none'
                    })

                    // setTimeout(function () {
                    //     wx.clearStorage()
                    //     wx.reLaunch({
                    //         url: '/pages/login/login',
                    //     })

                    // }, 1000)
                    return;
                }

                resolve(res)
                wx.hideLoading()
            } else {
                wx.showToast({
                    title: '服务器异常',
                    icon: 'none'
                })
            }
        }),
            fail: (res => {
            reject(res)
            wx.showToast({
                title: '网络异常，请检查网络！',
                icon: 'none'
            })
            console.log('request fail', res)
        })
        })
    });
}

function isHttpSuccess(status) {
    return status >= 200 && status < 300 || status === 304
}