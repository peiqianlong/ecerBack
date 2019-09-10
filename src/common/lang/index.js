import Vue from 'vue'

import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'



Vue.use(VueI18n)

let en = require('./en')
let cn =  require('./zh')

const messages = {
  cn:{
    ...cn,
    ...zhLocale
  },
  en:{
    ...en,
    ...enLocale
  }
}
// 结合cookie记录用户选择的语言，若无默认en
let storage = window.localStorage;
const i18n = new VueI18n({
  //定义默认语言
  locale: storage.language || 'cn', 
  messages
})


ElementLocale.i18n((key, value) => i18n.t(key, value))
export default i18n