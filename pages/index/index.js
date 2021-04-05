//const blueMethod = require('../me/me.js')
Page({
  data:{
    tempture1:17.43,
    tempture2:10.87,
    tempture3:5.89,
    tempture4:33.54,
    min:21,
    high:24,

    devices: [],
    connected: false,
    chs: []
  },
  onLoad(){
    const that =this
    setInterval(function () {
      let a = parseFloat(Math.random()*4+15).toFixed(2);
      let b = parseFloat(Math.random()*10+5).toFixed(2);
      let c = parseFloat(Math.random()*6+2).toFixed(2);
      let d =parseFloat(Math.random()*9+29).toFixed(2);
      that.setData({
        tempture1:a,
        tempture2:b,
        tempture3:c,
        tempture4:d
      })
      //console.log("轮播请求1秒触发一次");
    }, 2000)
  },
  
  
  addLog(event) {
    const add = event.currentTarget.dataset.add
    console.log("add", add)
    const ui = wx.getStorageSync("userinfo")
    if (!ui.openid) {
      wx.switchTab({
        url: '/pages/me/me',
      })
    } else {
      wx.cloud.callFunction({
        name: "createlog",
        data: {
          add: add,
          date: Date.now(),
          openid: ui.openid
        }
      })
    }
    wx.showToast({
      title: '设置成功',
      icon: 'success',
      duration: 1000//持续的时间
    })
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail)
    this.setData({
      min:e.detail.value.min,
      high:e.detail.value.high
    })
  },
  addTemperture(event) {
    //const that = this
    const min= this.data.min;
    const high= this.data.high
    console.log("min", min)
    console.log("high", high)
    const ui = wx.getStorageSync("userinfo")
    if (!ui.openid) {
      wx.switchTab({
        url: '/pages/me/me',
      })
    } else {
      wx.cloud.callFunction({
        name: "creatTemperture",
        data: {
          min:min,
          high:high,
          date: Date.now(),
          openid: ui.openid
        }
      })
      //blueMethod(min);
      //blueMethod(high);
    }
    
    wx.showToast({
      title: '数据上传成功',
      icon: 'success',
      duration: 1000//持续的时间
    })
    
  }
})