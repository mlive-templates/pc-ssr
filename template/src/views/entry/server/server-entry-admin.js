import Vue from 'vue'
import Vuex from 'vuex'
import App from '../../pages/admin/main'
import StoreFactory from '../../store/index'
import VueRouter from 'vue-router'
import routerConfig from '../../pages/admin/route'
import {
    GLOBAL
} from '../../store/mutation-types'
Vue.use(Vuex)
Vue.use(VueRouter)
const store = StoreFactory({})
const router = new VueRouter({
    routes: routerConfig,
    mode: 'history'
})
const app = new Vue({
    ...App,
    store,
    router
})

export default function (context) {
    return new Promise((resolve, reject) => {
        if (context._$forCache) {
            resolve(app)
            return
        }
        router.push({
            path: context.route
        })
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            if (!matchedComponents.length) {
                reject('没有找到对应的路由组件')
            }
            Promise.all(matchedComponents.map(component => {
                return component.preFetch && component.preFetch(store, router.currentRoute, null, context.params)
            })).then(() => {
                store.commit(GLOBAL.SET_USERINFO, context.userInfo)
                context.state = store.state
                resolve(app)
            }).catch((msg) => {
                msg = msg ? 'serverPreFetch error:' + msg.toString() : 'serverPreFetch 出错,原因不详'
                reject(msg)
            })
        })
    })
}