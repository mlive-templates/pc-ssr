const express = require('express')
const router = express.Router()
const render = require('../render.js')
const axios = require('axios')
const api = require('../../service')

function routerWrap(genFn) {
    return async function (req, res, next) {
        try {
            const response = await axios.get(api.getUserInfo, {
                headers: {
                    cookie: req.headers.cookie || ''
                }
            })
            const userInfo = response.data
            // userInfo.data.first = false
            // 此处不处理各级路由跳转，只负责获取用户信息，转发cookie，路由跳转下放到下级
            if (userInfo.success) {
                response.headers['set-cookie'].forEach(function (item) {
                    res.append('Set-Cookie', item)
                })
                res.userInfo = userInfo.data
            }
            await genFn(req, res, next)
        } catch (error) {
            error && console.error(error)
            if (req.accepts(['html', 'json']) === 'json') {
                res.status(500).json({
                    success: false,
                    msg: error.toString(),
                    data: ''
                })
            } else {
                res.redirect('/error')
            }
        }
    }
}

router.get('/', function (req, res, next) {
    res.redirect('/admin/dev')
})
// 首页即使登录以后 依然可以访问
router.get('/admin/dev', routerWrap(async function (req, res, next) {
    const html = await render.render('admin', {
        userInfo: res.userInfo,
        route: req.url,
        params: {
            headers: {
                cookie: req.headers.cookie || ''
            }
        }
    })
    res.send(html)
    res.end()
}))

module.exports = router