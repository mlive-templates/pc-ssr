const express = require('express')
const router = express.Router()
const viewRouter = require('./view/view')
const render = require('./render.js')
router.use('/', viewRouter)

router.get(/\w+\.(css|js|png|jpg|ico)$/, function (req, res, next) {
    res.sendStatus(404)
})
router.get('/error', async function (req, res, next) {
    const html = await render.render('404')
    res.send(html)
    res.end()
})
router.get('*', async function (req, res, next) {
    const html = await render.render('404')
    res.send(html)
    res.end()
})
module.exports = router