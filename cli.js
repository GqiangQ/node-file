
const program = require('commander')
const { add, clear, look } = require('./index')


program.option('-x, --xxx', 'xxxxxxxxxxxx')
program
  .command('add')
  .description('add a task')
  .action((args) => {
    add(args)
  })

program
  .command('clear')
  .description('clear all task')
  .action(clear);  
program
  .command('look')
  .description('clear all task')
  .action(look);  

program.parse(process.argv)
if (program.length === 2){
  
}