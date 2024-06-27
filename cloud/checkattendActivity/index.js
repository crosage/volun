// 检查用户是否参与活动

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { user_id, activity_id } = event
  // 参数验证
  if (!user_id || !activity_id) {
    return {
      code: 400,
      message: "缺少必需参数"
    }
  }

  try {
    // 检查用户是否已经参与该活动
    const existingParticipation = await db.collection("activity_participants").where({
      user_id: user_id,
      activity_id: activity_id
    }).get()

    if (existingParticipation.data.length > 0) {
      return {
        code: 200,
        message: "用户已经参与该活动",
        data: existingParticipation.data
      }
    } else {
      return {
        code: 404,
        message: "用户未参与该活动"
      }
    }
  } catch (err) {
    return {
      code: 500,
      message: "服务器内部错误",
      error: err
    }
  }
}
