// pages/create_page/create_page.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activity_name: '',
    description_thumb: "",
    description: '',
    location: '',
    date: '',
    registration_deadline: '',
    max_participants: 0,
    organizer: '',
    min_date: new Date().getTime(),
    max_date: new Date(new Date().getTime()).setFullYear(new Date(new Date().getTime()).getFullYear() + 1),
    current_date: new Date().getTime(),
    show: 0,
    formatted_date: "",
    username: "",
    user_permission: 0
  },
  onInputDatetime() {
    this.setData({
      show: 1,
    });
  },
  onSubmitDatetime(event) {
    const date = new Date(event.detail);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hour = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    this.setData({
      currentDate: event.detail,
      formatted_date: `${year}-${month}-${day} ${hour}:${minutes}`
    });
  },
  onCloseDatetimePicker() {
    this.setData({
      show: false
    });
  },
  onSubmitForm() {
    // activity_name,
    // description_thumb,
    // description,
    // location,
    // date,
    // post_time,
    // registration_deadline,
    // organizer,
    // max_participants,
    // current_participants,
    wx.cloud.callFunction({
      name: "createVolunteerActivity",
      data: {
        activity_name: this.data.activity_name,
        description_thumb: this.data.description_thumb,
        description: this.data.description,
        location: this.data.location,
        date: "",
        post_time: new Date().getTime(),
        registration_deadline: this.data.current_date,
        organizer: this.data.organizer,
        max_participants: this.data.max_participants,
        current_participants: 0,
        creator: this.data.username
      }
    }).then(res => {
      console.log(res.result)
      var code = res.result["code"]
      if (code == 200) {
        wx.navigateBack({
          delta: 1
        })
      } else if (code == 500) {

      }
    })
  },
  onCancel() {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
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
          user_permission: 1,
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