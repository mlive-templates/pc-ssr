const path = require('path')
const fs = require('fs-extra')
const rootPath = path.resolve(__dirname, '../../')

/**
 * 返回的数据用作webpack的client-entry, 形如:
 * {
 *     user : "/User/Mtime/xxx/user.js",
 *     404 : "/User/Mtime/xxx/404.js",
 * }
 */
function getClientEntry() {
    const entry = {}
    entry.vendors = [
        'core-js/library/fn/object/assign', 'core-js/library/es6/promise', 'vue', 'vuex', 'vue-router', 'vuex-router-sync'
    ]
    const readPath = path.join(rootPath, '/src/views/entry/client')
    const componentsPath = path.join(rootPath, '/src/views/components')
    const files = fs.readdirSync(readPath)
    const componentsFiles = fs.readdirSync(componentsPath)
    entry.common = []
    componentsFiles.map((val, index) => {
        if (val.indexOf('.vue') > -1) {
            entry.common.push(componentsPath + '/' + val)
        }
    })
    files.map((val, index) => {
        if (val.indexOf('.js') > -1) {
            const name = val.substr(val.lastIndexOf('/') + 1, val.indexOf('.js'))
            entry[name] = readPath + '/' + val
        }
    })
    return entry
}
/**
 * 返回的数据用作webpack的server-entry, 形如:
 * ['404', 'user']
 */
function getServerEntry() {
    const readPath = path.join(rootPath, '/src/views/entry/server')
    const files = fs.readdirSync(readPath)
    const entry = []
    files.map((val, index) => {
        if (val.indexOf('.js') > -1) {
            const name = val.substr(val.lastIndexOf('/') + 1, val.indexOf('.js'))
            entry.push(name)
        }
    })
    return entry
}
module.exports = {
    getClientEntry,
    getServerEntry
}