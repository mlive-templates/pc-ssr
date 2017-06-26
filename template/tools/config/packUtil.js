const webpack = require('webpack')
const chalk = require('chalk')
const dateUtil = require('../lib/dateUtil')
const ora = require('ora')
const spinner = ora('正在重新编译环境...')
// 打包, arg1:webpack配置文件
function packDev(cfg) {
    let compileCnt = 0
    return new Promise((resolve, reject) => {
        const compiler = webpack(cfg)
        compiler.watch({}, (err, stats) => {
            if (err === null && stats.compilation.errors.length === 0) {
                // 第一次编译
                if (compileCnt > 0) {
                    spinner.start()
                    spinner.succeed(dateUtil.formatDate('yyyy-MM-dd HH:mm:ss') + '...' + cfg.target + '端重新编译成功!')
                    spinner.stop()
                }
                compileCnt++
                resolve(1)
            } else {
                console.log(chalk.red('编译出现错误...'))
                console.log(stats.compilation.errors[0].message)
                reject(stats.compilation.errors)
            }
        })
    })
}

// 打包线上代码, arg1:webpack配置文件
function packProd(cfg) {
    return new Promise((resolve, reject) => {
        const compiler = webpack(cfg)
        compiler.run((err, stats) => {
            if (err === null && stats.compilation.errors.length === 0) {
                // 第一次编译
                resolve(1)
            } else {
                console.log('编译出现错误...')
                console.log(stats.compilation.errors[0].message)
                reject(stats.compilation.errors)
            }
        })
    })
}

module.exports = {
    packProd,
    packDev
}