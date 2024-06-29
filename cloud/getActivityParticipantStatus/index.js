// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { activity_id } = event

  // 参数验证
  if (!activity_id) {
    return {
      code: 400,
      message: "缺少必需参数 activity_id"
    }
  }

  try {
    // 查询已验证的参与者
    const verifiedParticipantsResult = await db.collection("activity_participants").where({
      activity_id: activity_id,
      verified: true
    }).get()

    // 查询未验证的参与者
    const unverifiedParticipantsResult = await db.collection("activity_participants").where({
      activity_id: activity_id,
      verified: false
    }).get()

    // 获取所有参与者的 user_id
    const verifiedUserIds = verifiedParticipantsResult.data.map(participant => participant.user_id)
    const unverifiedUserIds = unverifiedParticipantsResult.data.map(participant => participant.user_id)

    // 查询已验证参与者的详细信息
    const verifiedUsersResult = await db.collection("users").where({
      _id: db.command.in(verifiedUserIds)
    }).get()

    // 查询未验证参与者的详细信息
    const unverifiedUsersResult = await db.collection("users").where({
      _id: db.command.in(unverifiedUserIds)
    }).get()

    return {
      code: 200,
      message: "查询成功",
      data: {
        verified: verifiedUsersResult.data,
        unverified: unverifiedUsersResult.data
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
