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
    _id
  } = event

  try {
    const res = await db.collection("users").doc(_id).get()
    if (res.data) {
      return {
        code: 200,
        message: "查询成功",
        data: res.data
      }
    } else {
      return {
        code: 404,
        message: "未找到对应用户"
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