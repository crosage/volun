// 登录鉴权，未登录权限为0，不能查看自己参与的事务
// 登录权限为1，可以查看自己参加的事务
// 主办方权限为2，可以查看自己参加的事务并添加事务
// 管理员权限为3，可以查看自己参加的事务添加事务，还有查看人员列表

wx.cloud.init({
  env: 'volun-4g5ysmbd4b2b8c09', 
  traceUser: true,
})

Page({
  data: {
    active:"home",
    userPermission: 0,
  },
  play: function () {
    this.videoContext.play()
  },
  onChangePage(event) {
    this.setData({ active: event.detail })
    console.log(event.detail)
    switch (event.detail) {
      
      case 'home':
        wx.navigateTo({
          url: '/pages/index/index',
          fail: function(res){
            console.error("跳转失败:",res)
          }
        })
        break;
      case 'dashboard':
        wx.navigateTo({
          url: '/pages/dashboard/dashboard',
          fail: function(res){
            console.error("跳转失败:",res)
          }
        });
        break;
      case 'admin':
          wx.navigateTo({
            url: '/pages/admin/admin',
            fail: function(res){
              console.error("跳转失败:",res)
            }
          });
          break;
      case 'my':
        wx.navigateTo({
          url: '/pages/my/my',
          fail: function(res){
            console.error("跳转失败:",res)
          }
        });
        break;
    }
  },
  handleLogin:function () {
    // 调用微信提供的登录接口，获取临时登录凭证
    wx.login({
      success: function(res) {
        if (res.code) {
          // 登录成功，获取到了临时登录凭证
          var code = res.code;

          // 2. 使用临时登录凭证调用微信提供的接口，获取用户信息
          wx.getUserInfo({
            success: function(userInfo) {
              // 获取用户信息成功，可以在这里处理用户信息
              var nickname = userInfo.userInfo.nickName;
              var avatarUrl = userInfo.userInfo.avatarUrl;
              console.log("nickname"+nickname)
              // 在这里可以将用户信息发送到你的服务器保存，或者直接用于小程序中的展示
              
              // 提示用户登录成功
              wx.showToast({
                title: nickname,
                icon: 'success',
                duration: 2000
              });
            },
            fail: function() {
              // 获取用户信息失败，可以进行相应的处理，比如提示用户重新登录
              wx.showToast({
                title: '获取用户信息失败，请重新登录',
                icon: 'none',
                duration: 2000
              });
            }
          });
        } else {
          // 登录失败，可以进行相应的处理，比如提示用户重新登录
          wx.showToast({
            title: '登录失败，请重新登录',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: function() {
        // 调用登录接口失败，可以进行相应的处理，比如提示用户重新登录
        wx.showToast({
          title: '登录失败，请重新登录',
          icon: 'none',
          duration: 2000
        });
      }
    });
  }
  
})
