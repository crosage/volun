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
    page_size,
    page_number
  } = event

  try {
    const res = await db.collection("activities")
      .skip((page_number - 1) * page_size)
      .limit(page_size)
      .get()
    if (res.data.length > 0) {
      return {
        code: 200,
        message: "查询成功",
        data: res.data
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