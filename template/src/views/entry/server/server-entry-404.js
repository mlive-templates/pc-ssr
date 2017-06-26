import Vue from 'vue'
import App from '../../pages/404/main'
const app = new Vue({
    ...App
})
export default function (context) {
    return new Promise((resolve, reject) => {
        resolve(app)
    })
}