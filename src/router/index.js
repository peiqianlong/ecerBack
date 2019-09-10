import Vue from 'vue'
import Router from 'vue-router'
import routerlist from './modules/router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location)
}


Vue.use(Router)

let arr = routerlist

const defaultlist = [{
        path: '/',
        redirect: {
            name: '首页'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/Login/index.vue')
    },
]

const routers = new Router({
    mode: 'hash',
    hash: true,
    routes: defaultlist.concat(arr),
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})





export default routers