wx.cloud.init({
  env: 'volun-4g5ysmbd4b2b8c09', 
  traceUser: true,
})

Page({
  data: {
    active:"home",
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
  chooseVideo: function(){
    var that=this;
    wx.chooseVideo({
      sourceType:["album","camera"],
      maxDuration:60,
      camera:"back",

      success: function (res) {
        that.setData({
          src: res.tempFilePath,
          videoHeight:res.height,
          videoWidth:res.width
        })
      }
    })
  },
  //  const {activityDetail, activityThumbnail, requiredPeople, activityTitle } = event
  haha:function(){
    wx.switchTab({
      url: '/pages/admin/admin',
      fail: function(res){
        console.error("跳转失败:",res)
      }
    });
  },
  downloadFile: function () {
    var that = this
    wx.downloadFile({
      url: that.data.imageUrl, //用户可以更改
      success: function (res) {
        // 只要服务器有响应数据，就会进入 success 回调
        if (res.statusCode === 200) {
          console.log('文件被下载到：' + res.tempFilePath)
          that.setData({
            tip1: '提示：文件已下载。',
            tempFilePath: res.tempFilePath
          })
          Toast.success('成功');
        }
      }
    })
  },
  
  //获取临时文件信息
  getFileInfo: function () {
    var that = this
    let tempFilePath = this.data.tempFilePath
    console.log(tempFilePath)
    if (tempFilePath == '') {
      //文件尚未保存到本地
      wx.showModal({
        title: '提示',
        content: '请先下载文件！',
        showCancel: false
      })
    } else {
      //获取保存的文件信息
      wx.getFileInfo({
        filePath: tempFilePath,
        success: function (res) {
          Toast.success('文件大小：' + res.size + '字节。')
        }
      })
    }
  },
  getImageInfo: function () {
    var that = this
    wx.getImageInfo({
      src: this.data.imageUrl,
      success:function(res){
        console.log("hhhhhh");
        wx.showToast({
          icon:'none',
          title: '宽:'+res.width+',高:'+res.height,
        })
      }
    })
  },
  onVideoMetadata: function(e){
    var t=this;
    wx.getVideoInfo({
      src: this.data.videoUrl,
      success: function(res){
        that.setData({
          videoDuration:res.duration
        })
      }
    })
  }
  
})
