/**
 * 客户端 入口文件模版
 */
import 'core-js/library/fn/object/assign'
import 'core-js/library/es6/promise'
import Vue from 'vue'
import Vuex from 'vuex'
import StoreFactory from '../../store/index'
import VueRouter from 'vue-router'
import axios from '../../lib/axios'

// 修改 导入 来源
import routerConfig from '../../pages/admin/route'
import App from '../../pages/admin/main'

Vue.prototype.$ajax = axios
Vue.use(Vuex)
Vue.use(VueRouter)
const store = StoreFactory({})
const router = new VueRouter({
    routes: routerConfig,
    mode: 'history'
})
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}
router.onReady(() => {
    router.beforeEach((to, from, next) => {
        const matchedComponents = router.getMatchedComponents(to.fullPath)
        if (matchedComponents.length === 0) {
            window.location.href = '/error'
            return
        }
        router.app.showLoading()
        Promise.all(matchedComponents.map(component => {
            return component.preFetch && component.preFetch(store, to, from)
        })).then(() => {
            router.app.closeLoading()
            next()
        }).catch((msg) => {
            msg = msg || '抱歉,程序异常,请重试'
            router.app.closeLoading()
            router.app.$message({
                message: msg,
                type: 'error'
            })
            next(false)
        })
    })
})
const app = new Vue({
    el: '#app',
    store,
    router,
    extends: App
})

axios.$app = app