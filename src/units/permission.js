import router from "../router/index"
import store from "../store/index"
import {
    b2baddrouter
} from './b2brouterlist';
import {
    bloglist
} from "./blogrouterlist"
let stores = store
let routers = router
routers.beforeEach((to, from, next) => {

    var storage = window.localStorage;
    let nowtime = Date.parse(new Date());
    let time = storage.time
    let gologin = nowtime - time
        // debugger

    if (!storage.token) {
        if (to.path === "/login") {
            next();
        } else {
            next({
                path: '/login'
            });
        }
    } else {
        // 颜色更换/
        // debugger 
        let userinfo = JSON.parse(window.localStorage.userinfo);
        stores.dispatch("itemColor", userinfo.coloe);
        if (to.path === '/login') {
            next({
                path: '/login'
            });
        } else {
            // 
            if (stores.getters.roles.length === 0) {
                // 利用token拉去用户信息获取生产路由表
                // 模拟拿去路由
                let type = ''
                if (to.fullPath == "/index/:b2b") {
                    type = 'b2b'
                } else if (to.fullPath == "/index/:blog") {
                    type = 'blog'
                } else {
                    type = JSON.parse(storage.userinfo).type
                }
                if (type == 'b2b') {
                    let addrou = b2baddrouter
                    routers.addRoutes(addrou)
                    stores.dispatch("allRouter", addrou)
                    stores.dispatch("GenerateRoutes", ['/shopping1-2', '/shopping1-3'])
                } else {
                    let addrou = bloglist
                    routers.addRoutes(addrou)
                    stores.dispatch("allRouter", addrou)
                    stores.dispatch("GenerateRoutes", ['/shopping1-2', '/shopping1-3'])
                }

                // 提交数据  生成菜单
                next({
                        ...to,
                        replace: true
                    })
                    // next()
            } else {
                next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
            }
        }
        // next();
    }









    //   if (stores.getters.token) { // 判断是否有token
    //     if (to.path === '/login') {
    //       next({
    //         path: '/login'
    //       });
    //     } else {
    //       debugger
    //       if (stores.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
    //         stores.dispatch('GetInfo').then(res => { // 拉取info
    //           const roles = res.data.role;
    //           stores.dispatch('GenerateRoutes', {
    //             roles
    //           }).then(() => { // 生成可访问的路由表
    //             router.addRoutes(stores.getters.addRouters) // 动态添加可访问路由表
    //             next({
    //               ...to,
    //               replace: true
    //             }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
    //           })
    //         }).catch(err => {
    //           console.log(err);
    //         });
    //       } else {
    //         next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
    //       }
    //     }
    //   } else {
    //     // if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
    //     //   next();
    //     // } else {
    //     //   next('/login'); // 否则全部重定向到登录页
    //     // }
    //   }
});