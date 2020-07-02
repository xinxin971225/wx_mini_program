import md5 from "./md5.min."
const appid = '20200701000510485'
const key = 'bKOrf7C_CL9gz2DS_hnl'


function translate(q, {
  from = 'auto',
  to = 'auto'
} = {
  from: 'auto',
  to: 'auto'
}) {
  return new Promise((resolve, reject) => {
    const salt = Date.now()
    const sign = md5(`${appid}${q}${salt}${key}`)
    wx.request({
      url: 'https://fanyi-api.baidu.com/api/trans/vip/translate', //仅为示例，并非真实的接口地址
      data: {
        q,
        from,
        to,
        appid,
        salt,
        sign,
      },
      success(res) {
        if (res.data && res.data.trans_result) {
          resolve(res.data)
        }else {
          reject({ status: 'error', msg: '翻译失败' })
          wx.showToast({
            title: '翻译失败',
            icon: 'none',
            duration: 3000
          })}
      },
      fail(res) {
        reject({
          status: 'error',
          msg: '翻译失败'
        })
        wx.showToast({
          title: '网络异常',
          icon: 'none',
          duration: 3000
        })
      }
    })
  })
}
module.exports.translate = translate