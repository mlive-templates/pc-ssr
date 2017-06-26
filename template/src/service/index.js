const baseUrl = 'http://video-bms-api.mtime.com'
const api = {
    getUserInfo: '/currentUser',
    getCompanyInfo: '/currentEntInfo'
}
for (const key in api) {
    if (api.hasOwnProperty(key)) {
        const element = api[key]
        Object.defineProperty(api, key, {
            get: function () {
                return baseUrl + element
            }
        })
    }
}
module.exports = api