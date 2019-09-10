//actions文件
import {
    postRequest,
    getRequest,
    uploadFileRequest,
    putRequest,
    deleteRequest
} from '../units/request'
import {
    white,
    dark
} from "../units/ColorTheme"
// 给action注册事件处理函数。当这个函数被触发时候，将状态提交到mutations中处理
export function userinfo({
    commit
}, info) { // commit 提交；name即为点击后传递过来的参
    // getRequest("user").then (res => {
    //     debugger
    // })
    return commit('modifyAName', info)
}

export function GenerateRoutes({
    commit
}, val) {
    return commit('GenerateRoutes', val)
}

// export function GenerateRoutes({
//   commit
// }, data) {
//   return new Promise(resolve => {
//     // 获取缓存中的菜单信息
//     if (window.localStorage.userinfo) {
//       debugger
//       let menu = JSON.parse(window.localStorage.userinfo)
//       let routers = []
//       // generaMenu(routers, menu)
//       commit('SET_ROUTERS', routers)
//       resolve()
//     } else {
//       // 没有就请求接口 获取菜单接口
//       req.get('System/GetSysModule', {}).then(res => {
//         if (res.StatusCode === 200) {
//           // 设置缓存
//           setModule(JSON.stringify(res.Data))
//           let routers = []
//           generaMenu(routers, res.Data)
//           //
//           commit('SET_ROUTERS', routers)
//           resolve()
//         } else {
//           resolve()
//         }
//       })
//     }
//   })
// }


// 颜色主题切换
export function itemColor({
    commit
}, val) {
    if (val === '0') {

        return commit("itemColor", white)
    } else if (val === '1') {
        return commit("itemColor", dark)
    }

}

export function allRouter({
    commit
}, val) {
    return commit('allRouter', val)
}


// 存储屏幕宽度
export function width({
    commit
}, val) {
    return commit('width', val)
}

// 编辑还是后台
export function appshow({
    commit
}, val) {
    return commit('appshow', val)
}


//存入模板
export function savepagesettings({
    commit
}, val) {
    return commit('savepagesettings', val)
}
//存入前进后退
export function savestartdata({
    commit
}, val) {
    return commit('savestartdata', val)
}
//存入前进后退
export function savebackend({
    commit
}, val) {
    return commit('savebackend', val)
}
//图片api
export function ImgServer({
    commit
}, val) {
    return commit('ImgServer', val)
}
//记录步数
export function Num({
    commit
}, val) {
    return commit('Num', val)
}
//pagehandle
export function pagehandle({
    commit
}, val) {
    return commit('pagehandle', val)
}
//pa