const {db} = require('../db.js')
const fs = require('fs')
jest.mock('fs')

describe('db', () => {
   it('can read', async() => {
     fs.setReadMock('/xxx',null,[])
     const list = await db.read('/xxx')
     expect(list).toStrictEqual([],(path,data,) => {

     })
   }) 
   it('can weite', async() => {
        let file
        fs.setWriteMock('/yyy', (path,data,callback) => {
          file = data
          callback(null)
        })
        const list = [{title:'haha',done:false}]
        await db.write(list ,'/yyy')
        console.log(file)
        expect(file).toBe(JSON.stringify(list))
   }) 
   it('can updata', () => {}) 
   it('can del', () => {}) 
})