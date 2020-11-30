const fs = jest.genMockFromModule('fs')
const __fs = jest.requireActual('fs')

Object.assign(fs, __fs)
const readMocks = {}
fs.setReadMock = (path,error, data )=>{
  readMocks[path] = [error,data]
}
fs.readFile = (path,options,callback) => {
  if(callback === undefined) callback = options
  if(path in readMocks) {
    callback(...readMocks[path])
  } else {
    __fs.readFile(path,options,callback)
  }
}
const writeMock = {}
fs.setWriteMock = (path,fn) => {
  readMocks[path] = fn
}
fs.writeFile = (path,data, options,callback) => {
  if(callback === undefined) callback = options
  if(path in writeMock) {
    writeMock[path](path,data, options,callback)
  } else {
    __fs.writeFile(path,data, options,callback)
  }

}
module.exports = fs