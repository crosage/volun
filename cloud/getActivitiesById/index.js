// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { _id } = event
    const res = await db.collection("activities").doc(_id).get()
    if (res.data) {
      return {
        code: 200,
        message: "查询成功",
        activity: res.data
      }
    } else {
      return {
        code: 404,
        message: "未找到该活动"
      }
    }
  } catch (err) {
    console.error(err)
    return {
      code: 500,
      message: "服务器内部错误"
    }
  }
}
