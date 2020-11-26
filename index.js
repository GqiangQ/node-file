const program = require('commander')
program.option('-x, --xxx', 'xxxxxxxxxxxx')
program
  .command('add')
  .description('add a task')
  .action((...args) => {
    console.log(args.slice(0,-1));
  })

program
  .command('clear')
  .description('clear all task')
  .action((...args) => {
    console.log(args.slice(0,-1));
  });  

program.parse(process.argv)