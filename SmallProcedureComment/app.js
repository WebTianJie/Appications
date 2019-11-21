//app.js
App({
  onLaunch: function (e) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx51441ba03f4b09f2&secret=9ce97a970effcf6754082ac9f43c0f9f&js_code='+res.code+'&grant_type=authorization_code',
          success: function (response) {
            console.log(response);
            var openid = response.data.openid;
            console.log('请求获取openid:' + openid);
            //可以把openid存到本地，方便以后调用
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res);
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
          
        }
      }
    })
  
  },
  userInfoReadyCallback(res){
    this.globalData.userInfo = res.userInfo
  },
  globalData: {
    userInfo: null,
    serverPath:'http://192.168.6.182:12306/',
    title:'文章标题'
  }
})