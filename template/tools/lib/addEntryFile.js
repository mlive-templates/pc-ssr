const path = require('path')
const rootPath = path.resolve(__dirname, '../../')
const fs = require('fs-extra')

const argv = process.argv.slice(2)
if (!argv.length) {
    console.log('请带上参数文件名')
    console.log('<demo> npm run add -- --file="xxx"')
}

let fileName = ''
argv.forEach(function (item, key) {
    if (/--file=/.test(item)) {
        fileName = item.split('=')[1]
    }
})

function createFile(src, dest) {
    try {
        fs.copySync(src, dest)
        console.log(`file ${path.basename(dest)} create success!`)
    } catch (err) {
        console.log(err)
    }
}

if (fileName) {
    const clientPath = {
        src: path.join(__dirname, './entryClientTemplate.js'),
        dest: path.join(rootPath, 'src', 'views', 'entry', 'client', `${fileName}.js`)
    }
    const serverPath = {
        src: path.join(__dirname, './entryServerTemplate.js'),
        dest: path.join(rootPath, 'src', 'views', 'entry', 'server', `server-entry-${fileName}.js`)
    }
    createFile(clientPath.src, clientPath.dest)
    createFile(serverPath.src, serverPath.dest)
} else {
    console.log('请确保执行参数正确!')
    console.log('<demo> npm run add -- --file="xxx"')
}