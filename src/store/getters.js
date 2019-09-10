//getters文件
// 获取最终的状态信息
export const info = state => state.info
export const token = state => window.localStorage.token
export const roles = state => state.roles
export const addRouters = state => state.addRouters
export const routers = state => state.routers
export const itemColor = state => state.itemColor
export const width = state => state.width
export const appshow = state => state.appshow
export const pagesettings = state => state.pagesettings
export const startedit = state => state.startedit
export const backedit = state => state.backedit
export const ImgServer = state => state.ImgServer
export const Num = state => state.num
export const pagehandle = state => state.pagehandle