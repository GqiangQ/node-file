const fs = jest.genMockFromModule('fs')
const __fs = jest.requireActual('fs')

Object.assign(fs, __fs)
const mocks = {}
fs.setMock = (path,error, data )=>{
  mocks[path] = [error,data]
  return 'xxx'

}
fs.readFile = (path,options,callback) => {
  if(callback === undefined) callback = options
  if(path in mocks) {
    callback(...mocks[path])
  } else {
    __fs.readFile(path,options,callback)
  }
}
module.exports = fs