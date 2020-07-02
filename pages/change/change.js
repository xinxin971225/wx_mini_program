//获取应用实例

const app = getApp()

Page({
  data: {
    curLang:{},
    languageArray:app.globalData.languageArray
  },
  onLoad:function(){
    this.setData({curLang:app.globalData.curLang})
  },
  changeLang:function(e){
    let index = e.target.dataset.index
    this.setData({curLang:app.globalData.languageArray[index]})
    wx.setStorageSync('curLang',app.globalData.languageArray[index])
    wx.navigateBack({
    })
  }
})