// 对axios请求统一处理
import axios from 'axios'
// 选用el UI
import { Notification, MessageBox, Message } from 'element-ui'
// 模拟token存储方式 实际为vuex中使用 本次模拟为本地存储
function getToken() {
    // ... 一顿操作猛如虎
    const token = localStorage.getItem('token')
    return token
}
// 设置axios请求头
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分  
    //   process.env.VUE_APP_BASE_API 地址为config配置地址
    baseURL: process.env.VUE_APP_BASE_API,
    // 超时
    timeout: 10000
})
// request拦截器
service.interceptors.request.use(
    config => {
        if (getToken()) {
            config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        return config
    },
    error => {
        console.log(error)
        Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(res => {
    const code = res.data.code
    if (code === 401) {
        MessageBox.confirm(
            '登录状态已过期，您可以继续留在该页面，或者重新登录',
            '系统提示',
            {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }
        ).then(() => {
            store.dispatch('LogOut').then(() => {
                location.reload() // 为了重新实例化vue-router对象 避免bug
            })
        })
    } else if (code !== 200) {
        Notification.error({
            title: res.data.msg
        })
        return Promise.reject('error')
    } else {
        return res.data
    }
},
    error => {
        console.log('err' + error)
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
// ===========================
// 下面是组件的调用使用demo
// 列如 api 请求方法规范化、统一模块
import request from '@/utils/request'
// post 请求
export function get_list(data) {
    return request({
        url: '/hxf/hxf/list',
        method: 'POST',
        data: data
    })
}
//   get 请求
export function get_hxf(data) {
    return request({
        url: '/hxf/hxf/' + data,
        method: 'get',
    })
}
// get 请求 body中
export function get_body(query) {
    return request({
        url: '/hxf/hxf/hxf',
        method: 'get',
        params: query
    })
}
// put 请求
export function get_put(data) {
    return request({
        url: '/hxf/hxf',
        method: 'put',
        data: data
    })
}
// ==================
// 下面是对应视图组件render demo
import {
    get_list, get_hxf, get_body, get_put
} from "@/api/follow/planInfo";

get_list({
    //    参数
}).then(response => { //成功响应
   
}).catch(err=>{ //错误响应

})