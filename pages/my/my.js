// pages/admin/admin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: "my",
    userPermission: 0,
    username: "点击登录",
    user_id: 0
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
  login() {
    wx.redirectTo({
      url: '/pages/login/login',
      fail: function (res) {
        console.error("跳转失败:", res)
      }
    });
  },
  scanCode() {
    let that = this;
    wx.scanCode({
      success(res) {
        console.log(res);
        that.setData({
          result: res.result,
        });
      },
      fail(err) {
        console.error(err);
        wx.showToast({
          title: '扫描失败',
          icon: 'none',
        });
      },
    });
  },
  logout() {
    wx.removeStorageSync('token');
    this.setData({
      userPermission: 0,
      username: ""
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let storedToken = wx.getStorageSync('token');
    let token = storedToken;
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
          username: token.username,
          userPermission: 1,
          user_id: token._id
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})