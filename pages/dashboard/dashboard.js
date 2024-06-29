// pages/admin/admin.js
let drawQrcode = require("../../utils/weapp.qrcode.min.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: "dashboard",
    page: 1,
    page_size: 20,
    attended_activities: [],
    managed_activities: [],
    user_permission: 0,
    user_id: "",
    username: "",
    currentItem: {},
    showModal: false,
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
  loadActivities: function () {

  },
  reloadPage() {
    const options = this.options;
    this.onLoad(options);
  },
  createActivity() {
    wx.navigateTo({
      url: '/pages/create_page/create_page',
      fail: function (res) {
        console.error("跳转失败:", res)
      }
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
          user_permission: 1,
          user_id: token.user_id
        })
      }
    }

    wx.cloud.callFunction({
      name: "getActivitiesAttendedByUsername",
      data: {
        user_id: this.data.user_id,
        page_size: this.data.page_size,
        page_number: this.data.page
      }
    }).then(res => {
      var code = res.result["code"]
      console.log(res.result)
      if (code == 200) {
        this.setData({
          attended_activities: res.result["data"]
        })
        console.log(this.data.attended_activities)
      } else {}
    }).catch(console.error)

    wx.cloud.callFunction({
      name: "getActivitiesCreatedByUsername",
      data: {
        user_name: this.data.user_id,
        page_size: this.data.page_size,
        page_number: this.data.page
      }
    }).then(res => {
      var code = res.result["code"]
      console.log(res.result)
      if (code == 200) {
        this.setData({
          managed_activities: res.result["data"]
        })
        console.log(this.data.managed_activities)
      } else {}
    }).catch(console.error)
  },
  handleItemClick(event) {
    const index = event.currentTarget.dataset.index;
    const item = this.data.attended_activities[index];
    this.setData({
      currentItem: item,
      showModal: true,
    });
    drawQrcode({
      width: 200,
      height: 200,
      canvasId: 'myQrcode',
      text: JSON.stringify({
        user_id: this.data.user_id,
        item_id: item._id
      }),
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  onClose() {
    this.setData({
      showModal: false
    });
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
    this.reloadPage()
    wx.stopPullDownRefresh();
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