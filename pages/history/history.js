//获取应用实例
const app = getApp()

Page({
  data: {
   history:[]
  },
  onLoad:function(){
    this.setData({
      history: wx.getStorageSync('history')
    })
    console.log(this.data.history)
  }
})