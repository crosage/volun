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
    _id,
    user_name,
    student_id,
    type
  } = event

  try {
    const res = await db.collection("users").doc(_id).update({
      data: {
        user_name: user_name,
        student_id: student_id,
        type: type
      }
    })
    if (res.stats.updated > 0) {
      return {
        code: 200,
        message: "用户信息更新成功",
        updatedId: id
      }
    } else {
      return {
        code: 404,
        message: "未找到对应用户或更新失败"
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