const wpClientConf = require('./config/webpack-client.js')
const packageInfo = require('./lib/packageInfo.js')
const wpServerConf = require('./config/webpack-server.js')
const wpIndexConf = require('./config/webpack-index.js')
const packUtil = require('./config/packUtil.js')
const entryInfo = require('./lib/entryInfo.js')
const chalk = require('chalk')
const ora = require('ora')
const spinner = ora('正在编译本地环境...')
spinner.start()
// 1.创建/删除build目录, 拷贝package.json文件
packageInfo.copy().then(() => {
    console.log('拷贝package.json完成')
})

// 2.打包Client代码
packUtil.packDev(wpClientConf.getConfig()).then(() => {
    console.log('client编译完成')
    packServer()
})

// 3.打包Server端代码
function packServer() {
    const entry = entryInfo.getServerEntry()
    const promises = entry.map((name) => {
        const config = wpServerConf.getConfig(name)
        return packUtil.packDev(config)
    })

    Promise.all(promises).then((val) => {
        console.log('server编译完成')
        packIndex()
    })
}

// 4.打包Index代码
function packIndex() {
    packUtil.packDev(wpIndexConf.getConfig()).then(() => {
        console.log('index编译完成')
        console.log(chalk.cyan('编译成功!'))
        spinner.stop()
    })
}