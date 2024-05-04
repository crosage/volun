// 创建新的活动

// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const {
    activity_name,
    description_thumb,
    description,
    location,
    date,
    post_time,
    registration_deadline,
    organizer,
    max_participants,
    current_participants,
  } = event
  const activityData={
    activity_name: activity_name,
    description_thumb: description_thumb,
    description: description,
    location: location,
    date: date,
    post_time: post_time,
    registration_deadline: registration_deadline,
    organizer: organizer,
    max_participants: max_participants,
    current_participants: current_participants,
    creator: wxContext.OPENID
  }
  try {
    const res=await db.collection("activities").add({
      data:activityData
    })
    return {
      code:200,
      message: "活动创建成功",
      activityId: res._id
    }
  } catch(err) {
    return {
      code: 500,
      message: "服务器内部错误",
      error:err
    }
  }
}
