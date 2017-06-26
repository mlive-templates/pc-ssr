var path = require('path')
var fs = require('fs')

const baseConfig = {

    default: {
        name: 'default',
        port: '8193',
        staticServer: '//static1.mtime.cn/'
    },
    dev: {
        name: 'dev',
        staticServer: ''
    },
    qa: {
        name: 'qa',
        staticServer: ''
    },
    pre: {
        name: 'pre'
    },
    prod: {
        name: 'prod'
    }
}

function init() {
    /*eslint-disable*/
    var env = typeof process.env.NODE_ENV === 'undefined' ? 'dev' : process.env.NODE_ENV
    let config
    switch (env) {
        case 'prod':
            config = baseConfig.prod
            break
        case 'pre':
            config = baseConfig.pre
            break
        case 'qa':
            config = baseConfig.qa
            break
        default:
            config = baseConfig.dev
    }
    const dir = path.join(__dirname, './package.json')
    try {
        const pkgStr = fs.readFileSync(dir, 'utf8')
        const pkg = JSON.parse(pkgStr)
        config.cdn = pkg.cdn
    } catch (error) {
        console.error('can not read package.json')
    }
    return {
        name: get('name', config),
        port: get('port', config),
        cdn: get('cdn', config),
        staticServer: get('staticServer', config),
        startup: new Date()
    }
}

function getConfig(key, store) {
    const info = key.split('.')
    let cur = null
    info.map((item) => {
        if (typeof store[item] !== 'undefined') {
            store = store[item]
            cur = store
        } else {
            cur = null
        }
    })
    return cur
}

function get(key, config) {
    let value = getConfig(key, config)
    if (value === null) {
        value = getConfig(key, baseConfig.default)
        if (value === null) {
            console.warn('defaultConfig is undefined', key)
        }
    }
    return value
}

module.exports = init()