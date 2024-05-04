// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()
const MAX_LIMIT = 100 // 每页最大数量限制

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { page, pageSize } = event // 从事件参数中获取要查询的页数和每页数量

  try {
    // 计算应该跳过的记录数
    const skip = (page - 1) * pageSize

    // 执行分页查询
    const res = await db.collection("users")
      .skip(skip) // 跳过前面的记录
      .limit(pageSize > MAX_LIMIT ? MAX_LIMIT : pageSize) // 限制每页数量
      .get()

    // 如果查询结果不为空，则返回查询到的用户信息列表
    if (res.data.length > 0) {
      return {
        code: 200,
        message: "查询成功",
        data: res.data
      }
    } else {
      return {
        code: 404,
        message: "未找到用户信息"
      }
    }
  } catch (err) {
    return {
      code: 500,
      message: "服务器内部错误",
      error:err
    }
  }
}
