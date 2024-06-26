// 用户取消参与活动

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const {
    user_id,
    activity_id
  } = event

  // 参数验证
  if (!user_id || !activity_id) {
    return {
      code: 400,
      message: "缺少必需参数"
    }
  }

  try {
    // 检查用户是否已参与该活动
    const participation = await db.collection("activity_participants").where({
      user_id: user_id,
      activity_id: activity_id
    }).get()

    if (participation.data.length === 0) {
      return {
        code: 404,
        message: "用户未参与该活动"
      }
    }

    // 删除参与记录
    await db.collection("activity_participants").where({
      user_id: user_id,
      activity_id: activity_id
    }).remove()

    // 更新活动的当前参与人数
    await db.collection("activities").doc(activity_id).update({
      data: {
        current_participants: db.command.inc(-1)
      }
    })

    return {
      code: 200,
      message: "用户取消参与活动成功"
    }
  } catch (err) {
    return {
      code: 500,
      message: "服务器内部错误",
      error: err
    }
  }
}