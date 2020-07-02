//index.js
//获取应用实例
import {
  translate
} from '../../utils/api.js'
const app = getApp()
Page({
  data: {
    result: '',
    inputValue: '',
    hidden: true,
    curLang: {}
  },
  onLoad: function () {
    this.setData({
      curLang: app.globalData.curLang
    })
  },
  //事件处理函数
  onShow: function () {
    // 页面创建时执行
    if (wx.getStorageSync('curLang')) {
      this.setData({
        curLang: wx.getStorageSync('curLang')
      })
    }

  },
  clearAll: function () {
    this.setData({
      inputValue: '',
      hidden: true,
      result: '',
    })
  },
  onInPut: function (e) {
    this.setData({
      inputValue: e.detail.value,
    })
    if (this.data.inputValue) {
      this.setData({
        hidden: false,
      })
    } else {
      this.setData({
        hidden: true,
      })
    }

  },
  onconfirm: function (e) {
    translate(e.detail.value, {
      from: 'auto',
      to: wx.getStorageSync('curLang').lang
    }).then(res => {
      this.setData({
        result: res.trans_result[0].dst
      })
      let history = wx.getStorageSync('history') || []
      history.unshift({
        value: e.detail.value,
        result: res.trans_result[0].dst
      })
      history.length = history.length > 10 ? 10 : history.length
      wx.setStorageSync('history', history)
    })
  },
})