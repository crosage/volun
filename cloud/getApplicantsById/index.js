// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db=wx.cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const {activityDetail, activityThumbnail, requiredPeople, activityTitle } = event
  const activityData={
    creator: wxContext.OPENID,
    detail: activityDetail,
    requiredPeopleNumber: requiredPeople,
    activityThumbnail: activityThumbnail,
    activityTitle:activityTitle,
  }
  try {
    const res=await db.collection("activities").add({
      data:activityData
    })
    return {
      code:200,
      message: "活动创建成功",
      activityId: res._id
    }
  }catch(err){
    console.error(err)
    return {
      code:500,
      message: "服务器内部错误"
    }
  }
  
}