import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//导入字体图标
import './assets/fonts/iconfont.css'
//导入全局样式
import './assets/css/global.css'
//
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
    // 将axios 添加到原型中，那么vue实例可以直接通过 $http来访问axios
Vue.prototype.$http = axios

Vue.config.productionTip = false


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')