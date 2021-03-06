//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    temperture:[]
  },
  getlogs:function(){
    const that = this
    const ui = wx.getStorageSync("userinfo")
    if(!ui.openid){
      wx.switchTab({
        url: '/pages/me/me',
      })
    }else{
      wx.cloud.callFunction({
        name: "getlogs",
        data: {
          openid:ui.openid
        },
        success:res=>{
          console.log("res",res)
          that.setData({
            logs:res.result.data.map(log=>{
              var date = util.formatTime(new Date(log.date))
              log.date = date
              return log
            })
          })
        },
        fail: res => {
          console.log("res", res)
        }
      })
    }
  },
  getTemperture:function(){
    const that = this
    const ui = wx.getStorageSync("userinfo")
    if(!ui.openid){
      wx.switchTab({
        url: '/pages/me/me',
      })
    }else{
      wx.cloud.callFunction({
        name: "getTemperture",
        data: {
          openid:ui.openid
        },
        success:res=>{
          console.log("res",res)
          that.setData({
            temperture:res.result.data.map(temperture=>{
              var date = util.formatTime(new Date(temperture.date))
              temperture.date = date
              return temperture
            })
          })
        },
        fail: res => {
          console.log("res", res)
        }
      })
    }
  },
  //onLoad 页面首次加载的时候执行
  //onShow 页面每次切换的时候执行
  onShow:function(){
    this.getlogs()
    this.getTemperture()
  }
})
