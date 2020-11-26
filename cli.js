
const program = require('commander')
const { add, clear } = require('./index')


program.option('-x, --xxx', 'xxxxxxxxxxxx')
program
  .command('add')
  .description('add a task')
  .action((args) => {
    add(args.slice(0,-1))
  })

program
  .command('clear')
  .description('clear all task')
  .action(clear);  

program.parse(process.argv)