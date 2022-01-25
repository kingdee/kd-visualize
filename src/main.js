const path = require('path');
const program = require('commander');

// 自定义命令
const myCommand = {
  create: {
    alias: 'c', //别名
    description: '创建一个项目', // 描述
    examples: [ // 示例
      'hxh-cli create <project-name>',
    ],
  },
  config: {
    alias: 'conf',
    description: '配置项目',
    examples: [
      'hxh config set <k> <v>',
      'hxh config get <k>',
    ],
  },
  '*': {
    alias: '',
    description: '命令未找到',
    examples: [],
  },
};

/**
 * Reflect.ownKeys() 类似 Object.keys() 的功能。它返回一个由目标对象自身的属性键组成的数组。
 * 可以返回包含 Symbol 属性在内的自有属性。Object.keys() 返回属性 key ，但不包含不可枚举的属性。
 */
Reflect.ownKeys(myCommand).forEach((action) => {
  program
    .command(action)
    .alias(myCommand[action].alias)
    .description(myCommand[action].description)
    .action(() => {
      if (action === '*') {
      } else {
        // 如果创建的时候添加了项目名称，则传入项目名称
        const arr = [...process.argv];
        if (arr.length >= 3) {
          require(path.join(__dirname, action))(...process.argv.slice(3));
        } else {
          require(path.join(__dirname, action))();
        }
      }
    });
});

// 处理 help 命令，打印出 example
program.on('--help', () => {
  console.log('\nExamples');
  Reflect.ownKeys(myCommand).forEach(action => {
    myCommand[action].examples.forEach(example => {
      console.log(` ${example}`);
    });
  });
});

program
  .version('0.0.1')
  .parse(process.argv);
