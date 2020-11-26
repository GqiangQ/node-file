const fs = require('fs')
const homedir =process.env.HOME || require('os').homedir()
const path = require('path')

const dbPath = path.join(homedir, '.todo')
const { db } = require('./db')

module.exports.add = async (title) => {
  let list = await db.read()
  list.push({
    title,
    done:false
  })
  console.log(list)
  db.write(dbPath, JSON.stringify(list))
}

module.exports.clear = (...args) => {
  db.write(dbPath, '[]')
}