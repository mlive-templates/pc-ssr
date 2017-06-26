import axios from 'axios'
Object.assign(axios.defaults, {
    baseURL: 'http://video-bms-api.mtime.com/',
    withCredentials: true
})
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// axios.interceptors.request.use(function (config) {
//     return config;
// }, function (error) {
//     return Promise.reject(error);
// });
/**
 * ajax判断是否登陆
 */
axios.interceptors.response.use(function (response) {
        if (typeof window == 'undefined') {
            return response
        }

        if (!response.data.success && +response.data.errCode === 703) {
            return new Promise((resolve, reject) => {
                axios.$app && axios.$app.$confirm('登录失效，是否重新登录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    window.location.href = '/'
                }).catch(() => {
                    reject('登录失效!')
                })
            })
        } else {
            return response
        }
    },
    function (error) {
        return Promise.reject(error)
    })

export default axios