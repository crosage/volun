// pages/activity/activity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity_id: "",
    activity_name: "",
    current_participants: 0,
    date: "",
    description: "",
    description_thumb: "",
    location: "",
    max_participants: "",
    organizer: "",
    post_time: 0,
    registration_deadline: 0,
    username: "",
    user_permission: 0,
    user_id: ""
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
  /**
   * 生命周期函数--监听页面加载
   */
  attendActivity() {
    console.log(this.data.user_id)
    console.log(this.data.activity_id)
    wx.cloud.callFunction({
      name: "attendActivities",
      data: {
        user_id: this.data.user_id,
        activity_id: this.data.activity_id
      }
    }).then(res => {
      console.log(res.result)
      var code = res.result["code"]
      if (code == 200) {
        console.log("成功参加活动")
      } else {}
    }).catch(console.error)
  },

  onLoad(options) {
    const volun_id = options.volun_id;
    console.log("接收到的 volun_id:", volun_id);

    this.setData({
      activity_id: volun_id
    });

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
      name: "getActivitiesById",
      data: {
        _id: volun_id
      }
    }).then(res => {
      var code = res.result["code"]
      console.log(code)
      console.log(res.result["activity"])
      if (code == 200) {
        const data = res.result["activity"]
        console.log(data)
        this.setData({
          activity_name: data["activity_name"],
          current_participants: data["current_participants"],
          date: data["date"],
          description: data["description"],
          description_thumb: data["description_thumb"],
          location: data["location"],
          max_participants: data["max_participants"],
          organizer: data["organizer"],
          post_time: data["post_time"],
          registration_deadline: data["registration_deadline"]
        })
      } else {}
    }).catch(console.error)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  formatDate(timestamp) {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
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