const fs = require('fs')
const homedir =process.env.HOME || require('os').homedir()
const path = require('path')

const dbPath = path.join(homedir, '.todo')
const { db } = require('./db')

module.exports.add = async (title) => {
  let list = await db.read()
  list.push({title,done:false})
  await db.write(JSON.stringify(list))
}
 
module.exports.clear = async() => {
  await db.write(dbPath, '[]')
}
module.exports.look = async() => {
  let list = await db.read()
  console.log('任务列表：\n')
  list.forEach((element,index) => {
    console.log(`${index+1}  __ ${element.title}`)
  });
}