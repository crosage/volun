import { hex_md5 } from "../../utils/md5"
import Toast from '@vant/weapp/toast/toast';

Page({
  data: {
    username: "",
    passhash: "",
    user_id: "",
    active: 0,
  },

  onChangePage(event) {
    this.setData({
      active: event.detail
    })
    console.log(event.detail)
    switch (event.detail) {
      case 'home':
        wx.redirectTo({
          url: '/pages/index/index',
          fail: function (res) {
            console.error("跳转失败:", res)
          }
        })
        break;
      case 'dashboard':
        wx.redirectTo({
          url: '/pages/dashboard/dashboard',
          fail: function (res) {
            console.error("跳转失败:", res)
          }
        });
        break;
      case 'admin':
        wx.redirectTo({
          url: '/pages/admin/admin',
          fail: function (res) {
            console.error("跳转失败:", res)
          }
        });
        break;
      case 'my':
        wx.redirectTo({
          url: '/pages/my/my',
          fail: function (res) {
            console.error("跳转失败:", res)
          }
        });
        break;
    }
  },

  onLogin() {
    let pass = hex_md5(this.data.passhash)
    wx.cloud.callFunction({
      name: "getUserByUsername",
      data: {
        user_name: this.data.username
      }
    }).then(res => {
      console.log(res.result)
      var code = res.result["code"]
      if (code == 404) {
        wx.redirectTo({
          url: `/pages/register/register?username=${this.data.username}&passhash=${pass}`,
          fail: function (res) {
            console.error("跳转失败:", res)
          }
        });
      } else if (code == 200) {
        var data = res.result["data"][0]
        var userhash = data["passhash"]
        console.log(pass)
        console.log(userhash)
        if (userhash != pass) {
          console.log("密码错误")
          Toast.fail('密码错误或该ID已经被注册');
        } else {
          console.log("密码正确")
          let expirationTime = new Date().getTime() + 10 * 24 * 60 * 60 * 1000; // 10天的有效期
          wx.setStorageSync('token', {
            username: this.data.username,
            user_id: data["_id"],
            expires: expirationTime,
          });
          console.log("完成set" + wx.getStorageSync('token'))
          wx.redirectTo({
            url: '/pages/my/my',
            fail: function (res) {
              console.error("跳转失败:", res)
            }
          });
        }
      }
    }).catch(console.error)
  },

  onLoad(options) {},

  onReady() {},

  onShow() {},

  onHide() {},

  onUnload() {},

  onPullDownRefresh() {},

  onReachBottom() {},

  onShareAppMessage() {}
})
