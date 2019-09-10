/**
 * Created by BruceLv on 2018/1/22.
 */
import axios from 'axios'
import router from "../router/index"
let routers = router
    // let base = 'http://192.168.1.112:3000/'
let base
    // 开发环境
if (process.env.NODE_ENV === 'development') {
    base = ''
        // 编译环境
} else {
    // 测试环境
    if (process.env.type === 'test') {
        base = 'http://www.site.maoyt.com/api'
            // 正式环境
    } else {
        base = 'http://www.site.maoyt.com/api'
    }
}

var storage = window.localStorage;
axios.interceptors.request.use((config) => {
    // 加入token
    // config.headers.Authorization = 
    if (storage.token) {
        config.headers.Authorization = storage.token // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }

    return config
}, (err) => {
    alert('请求超时')
    return Promise.resolve(err)
})

// 权限处理
axios.interceptors.response.use((data) => {
    if (data.data.status == 203) {
        localStorage.clear();
        routers.replace({
            path: 'login',
        })
    } else {
        return data

    }

}, (err) => {
    // 数据异常统一处理
    if (err.response.status === 504 || err.response.status === 404) {
        console.log('服务器被吃了')
    } else if (err.response.status === 403) {
        console.log('权限不足,请联系管理员')
    } else {
        console.log('未知错误')
    }
    return Promise.resolve(err)
})

export function postRequest(url, params) {

    // return axios({
    //   method: 'post',
    //   url: url,
    //   data: params,
    //   headers: {
    //     'Content-Type':  'multipart/form-data'
    //   }
    // });


    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
    })
}

export function uploadFileRequest(url, params) {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export function putRequest(url, params) {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function(data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export function getdataRequest(url, params) {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
    })
}

export function getRequest(url, params) {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        params: params
    })
}