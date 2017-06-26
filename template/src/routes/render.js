const vueServerRender = require('vue-server-renderer')
const LRU = require('lru-cache')
const path = require('path')
const fs = require('fs-extra')
const templateFactory = require('./template')
const cacheBundle = {}
const cacheJson = {}
const bundleJsonPath = path.join(__dirname, './bundles')
const bundleFiles = fs.readdirSync(bundleJsonPath)
bundleFiles.forEach((val, index) => {
    if (val.indexOf('.json') > -1) {
        const matchs = val.match(/server-entry-(\w+)-vue-ssr-bundle\.json/)
        if (!matchs) {
            return
        }
        const key = matchs[1]
        cacheJson[key] = fs.readJsonSync(path.join(__dirname, './bundles', val))
        const bundleRender = vueServerRender.createBundleRenderer(
            cacheJson[key], {
                inject: false,
                cache: LRU({
                    max: 10000,
                    maxAge: 1000 * 60 * 15 // 缓存时间 15分钟
                }),
                template: templateFactory.render(key)
            })
        cacheBundle[key] = bundleRender
        bundleRender.renderToString({
            _$forCache: true
        }, (err, html) => {
            err && console.error(err)
        })
    }
})

function render(name, data) {
    data = data || {}
    // 计算渲染时间
    const oldTime = +(new Date())
    let bundleRender
    if (cacheBundle[name]) {
        bundleRender = cacheBundle[name]
    } else {
        const json = cacheJson[name]
        bundleRender = vueServerRender.createBundleRenderer(
            json, {
                inject: false,
                cache: LRU({
                    max: 10000,
                    maxAge: 1000 * 60 * 15 // 缓存时间 15分钟
                }),
                template: templateFactory.render(name)
            })
        cacheBundle[name] = bundleRender
    }
    return new Promise((resolve, reject) => {
        bundleRender.renderToString(data, (err, html) => {
            if (err) {
                reject(err)
            } else {
                const newTime = +(new Date())
                const cost = (newTime - oldTime)
                console.info('渲染完成' + name + '...消耗时长为:' + cost + 'ms')
                resolve(html)
            }
        })
    })
}

module.exports = {
    render
}