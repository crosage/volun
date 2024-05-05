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
    active: "home",
    userPermission: 0,
    username: ""
  },
  play: function () {
    this.videoContext.play()
  },
  onChangePage(event) {
    this.setData({
      active: event.detail
    })
    console.log(event.detail)
    switch (event.detail) {

      case 'home':
        wx.navigateTo({
          url: '/pages/index/index',
          fail: function (res) {
            console.error("跳转失败:", res)
          }
        })
        break;
      case 'dashboard':
        wx.navigateTo({
          url: '/pages/dashboard/dashboard',
          fail: function (res) {
            console.error("跳转失败:", res)
          }
        });
        break;
      case 'admin':
        wx.navigateTo({
          url: '/pages/admin/admin',
          fail: function (res) {
            console.error("跳转失败:", res)
          }
        });
        break;
      case 'my':
        wx.navigateTo({
          url: '/pages/my/my',
          fail: function (res) {
            console.error("跳转失败:", res)
          }
        });
        break;
    }
  },
  handtest() {
    wx.removeStorageSync('token');
    this.setData({
      userPermission: 0,
      username: ""
    })
  },
  onLoad(options) {
    let storedToken = wx.getStorageSync('token');
    let token = storedToken.value;
    let expirationTime = storedToken.expires;
    if (storedToken != "") {
      // 检查 token 是否过期
      if (expirationTime && new Date().getTime() > expirationTime) {
        // Token 已过期，需要重新获取
        // 清除过期的 token
        wx.removeStorageSync('token');
        // 这里可以执行重新获取 token 的逻辑
      } else {
        // Token 未过期，可以使用
        this.setData({
          username: token,
          userPermission: 1,
        })
      }
    }
  },
})