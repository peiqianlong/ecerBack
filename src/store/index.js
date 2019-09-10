import Vue from 'vue'
Vue.use(Vuex)
import Vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
import routers from '../router/modules/router'
import {
    white
} from "../units/ColorTheme"

const state = {
    info: "",
    routers: routers,
    roles: [],
    addRouters: '',
    itemColor: white,
    width: '',
    appshow: true,
    pagesettings: "",
    startedit: [],
    backedit: [],
    ImgServer: '',
    num: 0,
    pagehandle: "index"
}
const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
export default store