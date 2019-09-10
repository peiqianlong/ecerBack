// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

Vue.config.productionTip = false

Vue.use(ElementUI)
    // 语言切换
import i18n from "./common/lang/index"

// echarts图
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import store from './store/index'
//白屏解决
import ("babel-polyfill")
//图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
        preLoad: 1.3,
        error: require('./assets/img/bb9be3c5f69f3f40ea1de593bd0bcb7b.gif'),
        loading: require('./assets/img/aa0f54b390e3e5a5e1979230e30d6b6e.gif'),
        attempt: 1
    })
    // 路由权限管理
import "./units/permission"
//视频播放
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-contrib-hls'
import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer);
// jquery
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    i18n,
    components: {
        App
    },
    template: '<App/>'
})

function receiveMessageFromIframePage(event) {
    // console.log(event)

    // console.log("后端正在配合")
}


window.addEventListener("message", receiveMessageFromIframePage, false);

Vue.prototype.deepClone = function(data) {
    var type = typeof data;
    var obj;
    if (type === "array") {
        obj = [];
    } else if (type === "object") {
        obj = {};
    } else {
        return data;
    }
    if (type === "array") {
        for (var i = 0, len = data.length; i < len; i++) {
            obj.push(this.deepClone(data[i]));
        }
    } else if (type === "object") {
        for (var key in data) {
            obj[key] = this.deepClone(data[key]);
        }
    }
    return obj;
}
Vue.prototype.srcstr = function(param, x, y) {
    return `${param.media_url_http}_${x}x${y}.${param.media_suffix}`
}
Vue.prototype.ImgShow = function(param) {
    let img = new Image();
    img.src = param;
    let css = "imgscaleshow"
    img.onload = function() {
        if (img.width > img.height) {
            css = 'imgscaleshowheight'
        } else if (img.width < img.height) {
            css = 'imgscaleshowwidth'
        } else {
            css = 'imgscaleshow'
        }
        console.log("llll")
        console.log(css)
        return css
    };
}