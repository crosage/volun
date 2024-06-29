import Toast from '@vant/weapp/toast/toast';

Page({
  data: {
    username: "",
    passhash: "",
    student_id: "",
    student_name: ""
  },

  onRegister() {
    wx.cloud.callFunction({
      name: "createNewUser",
      data: {
        user_name: this.data.username,
        passhash: this.data.passhash,
        student_id: this.data.student_id,
        student_name: this.data.student_name,
        type: 1
      }
    }).then(res => {
      Toast.success('成功注册');
      console.log("完成用户创建")
      let expirationTime = new Date().getTime() + 10 * 24 * 60 * 60 * 1000; // 10天的有效期
      wx.setStorageSync('token', {
        value: this.data.username,
        expires: expirationTime,
      });
      console.log("完成set" + wx.getStorageSync('token'))
      wx.redirectTo({
        url: '/pages/my/my',
        fail: function (res) {
          console.error("跳转失败:", res)
        }
      });
    }).catch(console.error)
  },

  onLoad(options) {
    this.setData({
      username: options.username,
      passhash: options.passhash
    });
  }
})
