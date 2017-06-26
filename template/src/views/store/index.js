import Vuex from 'vuex'

import {
    GLOBAL
} from './mutation-types'

export default function StoreFactory(modules) {
    return new Vuex.Store({
        strict: true,
        // 全局状态
        state: {
            // 用户信息
            userInfo: {
                email: '',
                userId: ''
            },
            dataFromServer: false
        },
        mutations: {
            [GLOBAL.SET_USERINFO](state, data) {
                state.userInfo = Object.assign(state.userInfo, data)
            },
            [GLOBAL.SET_DATAFROM](state, flag) {
                state.dataFromServer = flag
            }
        },
        getters: {
            userInfo: state => state.userInfo
        },
        modules: modules
    })
}