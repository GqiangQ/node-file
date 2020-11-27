const homedir =process.env.HOME || require('os').homedir()
const fs = require('fs')
const path = require('path')

const dbPath = path.join(homedir, '.todo')

module.exports.db =  {
  read (path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, {flag:'a+'} , (err, data) => {
        if (err) return reject(err)
        let list = JSON.parse(data.toString() || '[]')
        resolve(list)
      })
    })
  },
  write (content, path = dbPath, ) {
    return new Promise((resolve, reject)=>{
      fs.writeFile(path,content, (err2, data) => {
        if(err2)reject(err2)
        else resolve
      } )
    })
    
  },
}