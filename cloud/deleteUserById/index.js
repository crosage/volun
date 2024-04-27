// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { _id } = event

  try {
    const res = await db.collection("User").doc(_id).remove()
    return {
      code: 200,
      message: "用户删除成功",
      result: res.stats
    }
  } catch (err) {
    console.error(err)
    return {
      code: 500,
      message: "服务器内部错误"
    }
  }
}
