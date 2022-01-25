const axios = require('axios');
const inquirer = require('inquirer');
const replace = require('replace-in-file');
const ora = require('ora');
const child_process = require('child_process');
const remove = require('remove');

const {spawn} = child_process; // 子进程

const spinner = ora('downloading template ...');

/**
 * clone 项目到指定临时文件夹
 * @param clonePath 传入项目名称作为文件夹名称
 * @param templateUrl git 仓库地址
 * @returns {Promise<unknown>} 下载完成返回
 */
const cloneToTempDir = (clonePath, templateUrl) => {
  return new Promise((resolve, reject) => {
    const clone = spawn('git', ['clone', templateUrl, clonePath]);

    clone.on('error', err => {
      console.log('下载模板错误: ' + err);
      reject(err);
    });
    clone.on('close', code => {
      console.log('模板下载完成：' + code);
      // editFile({ projectName, downloadPath });
      resolve(clonePath);
    });
  });
};

/**
 * 全局替换项目名称并删除 .git 文件
 * @param projectName 项目名称
 * @param downloadPath 项目地址
 * @returns {Promise<void>} 完成后返回
 */
const editFileAndDelGit = async function ({projectName, downloadPath}) {
  const pwd = process.cwd();
  const fullDownloadPath = pwd + '/' + downloadPath;

  try {
    const options = {
      files: [
        fullDownloadPath + '/**/*',
      ],
      from: /test/g, // 替换占位符
      to: projectName,
    };
    await replace(options);

    // 删除当前文件的git
    remove.removeSync(fullDownloadPath + '/.git');
  } catch (error) {
    console.error('Error occurred:', error);
  }
};


module.exports = projectName => {
  const questions = [
    {
      type: 'input',
      name: 'projectName',
      message: 'projectName：(项目名称)',
      default: projectName,
      validate(val) {
        if (!val) {
          return '请输入项目名';
        }
        return true;
      },
    },
    // {
    //   type: 'list',
    //   name: 'template',
    //   message: '请选择模板',
    //   choices: [{
    //     name: ' test1',
    //     value: 'test1',
    //   },
    //     {
    //       name: 'test2',
    //       value: 'test2',
    //     }],
    // },
  ];
  const urlMap = {
    'test1': 'https://github.com/hxh2010/cli-template-test.git',
    'test2': 'https://github.com/hxh2010/cli-template-test.git',
  };

  inquirer.prompt(questions).then(answers => {
    const projectName = answers.projectName;
    ///const template = answers.template;
    // const templateUrl = urlMap[template];

    const templateUrl = 'https://github.com/oujj/visualize.git';
    spinner.start();
    spinner.color = 'green';

    cloneToTempDir(projectName, templateUrl).then(clonePath => {
      editFileAndDelGit({ projectName, downloadPath: clonePath }).then(() => {
        spinner.succeed();
      });
    });
  });
};
