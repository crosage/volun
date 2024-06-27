// 核验用户参与活动

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const {
    admin_id,
    user_id,
    activity_id
  } = event

  // 参数验证
  if (!admin_id || !user_id || !activity_id) {
    return {
      code: 400,
      message: "缺少必需参数",
      admin_id:admin_id,
      user_id:user_id,
      activity_id:activity_id
    }
  }

  try {
    // 获取活动数据
    const activity = await db.collection("activities").doc(activity_id).get()
    const activityData = activity.data

    // 检查创建者 ID 是否等于传入的管理者 ID
    if (activityData.creator !== admin_id) {
      return {
        code: 403,
        message: "无权限进行此操作"
      }
    }

    // 查找用户参与记录
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

    // 更新核验状态
    await db.collection("activity_participants").doc(participation.data[0]._id).update({
      data: {
        verified: true
      }
    })

    return {
      code: 200,
      message: "用户核验成功"
    }
  } catch (err) {
    return {
      code: 500,
      message: "服务器内部错误",
      error: err,
      admin_id:admin_id,
      user_id:user_id,
      activity_id:activity_id

    }
  }
}