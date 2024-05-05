// pages/create_page/create_page.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activity_name: '',
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
    formatted_date: ""
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
  onClose() {
    this.setData({
      show: false
    });
  },
  onPostList() {
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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