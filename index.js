const inquirer = require('inquirer')

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
  await db.write('[]')
}
module.exports.look = async() => {
  let list = await db.read()
  inquirer.prompt([
    {
      type:'list',
      name:'index',
      message:'请选择你的任务:',
      choices: [...list.map((item,index) =>{
        return {name:`${ item.done ? '[√]' : '[×]' } ${index+1} - ${item.title}`,value:index}
      }),{name:'退出', value:-1},{name:'添加', value:-2}]
    }
  ]).then(res => {
    const index = res.index
    if(res.index >= 0){
      inquirer.prompt([
        {
          type:'list',
          name:'action',
          message:'请选择你的操作:',
          choices: [
            {name:'完成', value:1},
            {name:'未完成', value:2},
            {name:'改标题', value:3},
            {name:'删除', value:4},
            {name:'退出', value:-1},
          ],
        }]).then(res=>{
          const action = res.action
          if(action === 1 ) {
            list[index].done = true
            db.write(JSON.stringify(list))
          }
          if(action === 2 ) {
            list[index].done = false
            db.write(JSON.stringify(list))
          }
          if(action === 3 ) {
            inquirer.prompt({
              type: 'input',
              name: 'title',
              message: '输入修改的标题:'
            }).then(res=>{
              const title = res.title
              list[index].title = title
              db.write(JSON.stringify(list))
            })
          }
          if(action === 4 ) {
            list.splice(index,1)
            db.write(JSON.stringify(list))
          }
        })
    }
    if (index === -2) {
      inquirer.prompt({
        type: 'input',
        name: 'title',
        message: '输入添加的任务:'
      }).then(res=>{
        const title = res.title
        list.push({title,done: false})
        db.write(JSON.stringify(list))
      })
    }
  })
}
