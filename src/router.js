import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'

Vue.use(Router)
    // 路由规则
const router = new Router({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
        { path: '/home', component: Home }
    ]
})

//挂载路由导航守卫,to表示将要访问的路径，from表示从哪里来，next 是一个函数 是下一个要做的操作 表示放行
router.beforeEach((to, from, next) => {
        //  任何情况都可以访问都登录页面  所以当没有登陆的时候  也表示放行
        if (to.path === '/login')
            return next();

        //获取token  验证用户是否登录成功
        const tokenStr = window.sessionStorage.getItem('token')
            // 如果没有登录 就跳转到登录页面（强制性的） 如果登录了就跳转到对应的页面
        if (!tokenStr) return next('/login')


        next();

    })
    // 在暴露router 之前，设置路由导航守卫
export default router