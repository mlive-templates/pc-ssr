const config = require('../config')
const path = require('path')
const fs = require('fs-extra')
// 缓存assets，暂时忽略publicPath
const cacheAssetsJson = fs.readJsonSync(path.join(__dirname, './bundles/client-assets.json'))

function render(name) {
    const staticServer = config.staticServer
    const cdn = config.cdn
    const env = config.name
    const startup = config.startup
    const publicPath = staticServer + '/' + cdn
    const css = cacheAssetsJson[name].css.map(function (item) {
        return `<link rel="stylesheet" href="${publicPath}/${item}" />`
    }).join('')
    const scripts = cacheAssetsJson[name].js.map(function (item) {
        return `<script type="text/javascript" src="${publicPath}/${item}"></script>`
    }).join('')
    const html = `
    <!doctype html>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="renderer" content="webkit" />
        <meta name="360-fullscreen" content="true" />
        <meta name="x5-fullscreen" content="true" />
        <meta name="full-screen" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="http-equiv=X-UA-COMPATIBLE" content="IE=edge,chrome=1" />
        <meta name="startup" content="${startup}" />
        <meta content="${cdn}" name="cdn">
        <meta content="${env}" name="env">
        <link type="image/x-icon" href="//static1.mtime.cn/favicon.ico" rel="shortcut icon" />
        <link type="image/x-icon" href="//static1.mtime.cn/favicon.ico" rel="bookmark" />
        <link rel="apple-touch-icon" href="//static1.mtime.cn/favicon.ico" />
        ${css}
        <title>时光片方管理平台</title>
    </head>
    <body>
        <!--vue-ssr-outlet-->
        {{{ renderState() }}}
        ${scripts}
    </body>
    </html>
    `
    return html
}

module.exports = {
    render
}