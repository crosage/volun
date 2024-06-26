// components/volun_card/volun_card.js
let drawQrcode = require("../../utils/weapp.qrcode.min");

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ""
    },
    label: {
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
      type: String,
      value: ""
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

},

/**
 * 组件的方法列表
 */
methods: {

},
lifetimes: {

}
})