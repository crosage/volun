// components/volun_card/volun_card.js
let drawQrcode = require("../../utils/weapp.qrcode.min");

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    volun_id: {
      type: String,
      value: ""
    },
    activity_name: {
      type: String,
      value: ""
    },
    description_thumb: {
      type: String,
      value: ""
    },
    description: {
      type: String,
      value: ""
    },
    location: {
      type: String,
      value: ""
    },
    date: {
      type: String,
      value: ""
    },
    post_time: {
      type: String,
      value: ""
    },
    registration_deadline: {
      type: Number,
      value: 0
    },
    organizer: {
      type: String,
      value: ""
    },
    creator: {
      type: String,
      value: ""
    },
    max_participants: {
      type: Number,
      value: 0
    },
    current_participants: {
      type: Number,
      value: 0
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    formattedDeadline: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    formatTimestamp(timestamp) {
      console.log(timestamp)
      const date = new Date(timestamp); // 将时间戳转换为日期对象
      console.log(date)
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      const hours = ('0' + date.getHours()).slice(-2);
      const minutes = ('0' + date.getMinutes()).slice(-2);
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
    onLearnMore() {
      const volun_id = this.data.volun_id;
      wx.navigateTo({
        url: '/pages/activity/activity?volun_id=' + volun_id,
        fail: function (res) {
          console.error("跳转失败:", res)
        }
      })
    },
  },

  lifetimes: {
    attached() {
      this.setData({
        formattedDeadline: this.formatTimestamp(this.data.registration_deadline)
      })
    }
  }
})