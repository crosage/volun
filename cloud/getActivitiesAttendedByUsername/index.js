// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const {
    user_id,
    page_size,
    page_number
  } = event

  try {
    // 首先在 participationData 表中查找 user_id 对应的记录
    const userParticipation = await db.collection("activity_participants")
      .where({
        user_id: user_id
      })
      .skip((page_number - 1) * page_size)
      .limit(page_size)
      .get()

    if (userParticipation.data.length === 0) {
      return {
        code: 404,
        message: "未找到相关活动",
        data: []
      }
    }
    // 从 participationData 中获取 activity_id
    const activityIds = userParticipation.data.map(record => record.activity_id)

    // 使用 activity_id 在 activities 表中查找相关活动
    const activities = await db.collection("activities")
      .where({
        _id: db.command.in(activityIds)
      })
      .get()

    if (activities.data.length > 0) {
      return {
        code: 200,
        message: "查询成功",
        data: activities.data,
        // activities:userParticipation.data
      }
    } else {
      return {
        code: 404,
        message: "未找到相关活动",
        data: []
      }
    }
  } catch (err) {
    return {
      code: 500,
      message: "服务器内部错误",
      error: err,
      // activities:userParticipation.data
    }
  }
}