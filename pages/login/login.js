// pages/login/login.js
import {hex_md5} from "../../utils/md5"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    passhash:"",
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
  // const { user_name,passhash,student_name, student_id, type} = event
  onLogin(){
    let pass=hex_md5(this.data.passhash)
    wx.cloud.callFunction({
      name:"createNewUser",
      data:{
        user_name:this.data.username,
        passhash:pass,
        student_name:"",
        student_id:"",
        type:1
      }
    }).then(res=>{
      console.log(res.result)
      let expirationTime = new Date().getTime() + 10 * 24 * 60 * 60 * 1000; // 10天的有效期
      let tmp=new Date().getTime()
      console.log(tmp)
      wx.setStorageSync('token', {
        value: this.data.username,
        expires: expirationTime,
      });
      console.log("完成set"+wx.getStorageSync('token'))
      wx.navigateTo({
        url: '/pages/my/my',
        fail: function(res){
          console.error("跳转失败:",res)
        }
      });
    }).catch(console.error)
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