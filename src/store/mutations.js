//motations文件
import router from '../router/index'
// 提交 mutations是更改Vuex状态的唯一合法方法
export const modifyAName = (state, info) => { // A组件点击更改餐馆名称为 A餐馆
    state.info = info // 把方法传递过来的参数，赋值给state中的resturantName
}

export const GenerateRoutes = (state, val) => {
    let store = state.routers
    for (let i in state.addRouters) {
        store.push(state.addRouters[i])
    }
    state.routers = store
    state.roles = val
}

export const itemColor = (state, val) => {
    state.itemColor = val
}

export const allRouter = (state, val) => {
    state.addRouters = val
}
export const width = (state, val) => {
    // state.addRouters = val
    if (val <= 1000) {
        state.width = 'ml'
    } else {
        state.width = 'gl'
    }
}

export const appshow = (state, val) => {
    state.appshow = val
}
export const savepagesettings = (state, val) => {
    state.pagesettings = val
}
export const savestartdata = (state, val) => {
    state.startedit = val
}
export const savebackend = (state, val) => {
    state.backedit = val
}
export const ImgServer = (state, val) => {
    state.ImgServer = val
}
export const Num = (state, val) => {
    state.num = val
}
export const pagehandle = (state, val) => {
    state.pagehandle = val
}