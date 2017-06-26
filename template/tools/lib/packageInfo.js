const path = require('path')
const rootPath = path.resolve(__dirname, '../../')
const fs = require('fs-extra')
const dateUtil = require('./dateUtil.js')
// 拷贝package.json文件到build下
function copy() {
    return new Promise((resolve, reject) => {
        const packageInfo = fs.readJsonSync(rootPath + '/package.json')
        const name = packageInfo.name
        const version = dateUtil.formatDate('yyyyMMddHHmmss')
        const cdn = name + '/' + version
        packageInfo.cdn = cdn
        // 删除client
        fs.removeSync(path.join(rootPath, 'build', 'client'))
        // 创建文件夹
        const fileDir = path.join(rootPath, 'build', 'client', cdn)
        fs.mkdirsSync(fileDir)
        // 写入package.json
        const packageDir = path.join(rootPath, 'build')
        fs.writeJSONSync(packageDir + '/package.json', packageInfo)


        // 如果存在npm-shirnkwrap.json 文件则拷贝到build目录下
        if (fs.existsSync(rootPath + '/yarn.lock')) {
            fs.copySync(rootPath + '/yarn.lock', rootPath + '/build/yarn.lock')
        }
        if (!fs.existsSync(rootPath + '/tools/config/app.json')) {
            console.error('不存在app.json')
        } else {
            fs.copySync(rootPath + '/tools/config/app.json', rootPath + '/build/config/app.json')
        }
        resolve()
    })
}

function getInfo() {
    const packageInfo = fs.readJsonSync(path.join(rootPath, '/build/package.json'))
    return packageInfo
}



module.exports = {
    copy,
    getInfo
}