const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try{
    return await db.collection('temperture').add({
      data:{
        min:event.min,
        high:event.high,
        date:event.date,
        openid:event.openid
      }
    })
  }catch(e){
    console.log(e)
  }
}