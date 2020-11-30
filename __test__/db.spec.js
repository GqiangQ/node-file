const {db} = require('../db.js')
const fs = require('fs')
jest.mock('fs')

describe('db', () => {
   it('can read', async() => {
     fs.setMock('/xxx',null,[])
     const list = await db.read('/xxx')
     expect(list).toStrictEqual([])
   }) 
   it('can weite', () => {}) 
   it('can updata', () => {}) 
   it('can del', () => {}) 
})