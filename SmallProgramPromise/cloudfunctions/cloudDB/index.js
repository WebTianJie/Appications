// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();
const _=db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  const targetDB=db.collection(event.dbname);
  if(event.type=='insert'){
    return  await targetDB.add({
      data:event.data
    })
  } else if(event.type=="update"){
      return  await  targetDB.doc(event.key).update({
        data:event.data
      })
  }else if(event.type=='delete'){
    return await targetDB.where(event.condition).remove()
  }else if(event.type=='get'){
    return await targetDB.where(event.condition).skip(20*event.skip).limit(event.limit).get();
  }
}