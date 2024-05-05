// 创建新的用户（我真懒得弄盐值处理了）

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
    user_name,
    passhash,
    student_name,
    student_id,
    type
  } = event

  // 构造用户数据
  const userData = {
    user_name: user_name,
    passhash: passhash,
    student_name: student_name,
    student_id: student_id,
    type: type
  }
  try {
    await db.collection("users").add({
      data: userData
    }).then(res => {
      console.log(res)
    })
    return {
      code: 200,
      message: "用户创建成功",
      openid: wxContext.OPENID
    }
  } catch (err) {
    return {
      code: 500,
      message: "服务器内部错误",
      error: err
    }
  }
}