import axios from "axios"
import Cookies from "js-cookie"
import { Message } from "element-ui"
import Vue from 'vue'
// axios配置
axios.defaults.timeout = 50000 // 超时时间
axios.defaults.baseURL = '' //接口地址
export const Imgslogos = '' //自定义图片地址
// loading加载动画
let loading;
function startLoading () {
  loading = Vue.prototype.$loading({
    lock: true,
    text: "Loading...",
    target: document.querySelector('.loading-area')
  });
}
function endLoading () {
  loading.close();
}
let needLoadingRequestCount = 0;
function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}
function tryHideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}
// http request 拦截器
axios.interceptors.request.use(config => {
  showFullScreenLoading();
  if (Cookies.get("token")) {
    config.headers.token = Cookies.get("token")
  }
  if (config.method == 'post') {
    config.headers.urlflag = sessionStorage.getItem("path")
    config.headers.timespan = Date.parse(new Date()) / 1000;//encryptData(keys, Date.parse(new Date()) / 1000)
  } else if (config.method == 'get') {
    config.headers.urlflag = sessionStorage.getItem("path")
    config.headers.timespan = Date.parse(new Date()) / 1000; //encryptData(keys, Date.parse(new Date()) / 1000)
  }
  return config
}, error => {
  tryHideFullScreenLoading();
  return Promise.reject(error.response)
})

// http response 拦截器
axios.interceptors.response.use(
  response => {
    tryHideFullScreenLoading();
    // 和后端商量配置
    if (response.data.StatusCode == 'Ok') {
      return Promise.resolve(response)
    } else if (response.data.StatusCode == 'Fail') {
      Message({
        showClose: true,
        message: response.data.Message,
        type: "error",
        offset: 300
      })
      return Promise.reject(response)
    } else if (response.data.StatusCode == 'NoLogin') {
      Message({
        showClose: true,
        message: response.data.Message,
        type: "warning",
        offset: 400
      })
      sessionStorage.removeItem("addTab");
      Cookies.remove("token")
      location.reload()
    } else if (response.data.StatusCode == 'Stop') {
      Message({
        showClose: true,
        message: response.data.Message,
        type: "warning",
        offset: 400
      })
      sessionStorage.removeItem("addTab");
      Cookies.remove("token")
      location.reload()
    } else if (response.data.StatusCode == 'IllegalRequest') {
      Message({
        showClose: true,
        message: response.data.Message,
        type: "warning",
        offset: 400
      })

    } else if (response.data.StatusCode == 'NoPurview') {
      Message({
        showClose: true,
        message: response.data.Message,
        type: "warning",
        offset: 400
      })
    } else {
      return Promise.resolve(response)
    }
  },
  error => {
    tryHideFullScreenLoading();
    if (error.response.status === 404) {
      Message({
        showClose: true,
        message: "请求地址出错",
        type: "warning",
        offset: 400
      })
    } else if (error.response.status === 401) {
      Message({
        showClose: true,
        message: error.response.data.Message,
        type: "warning",
        offset: 400
      })
      sessionStorage.removeItem("addTab");
      Cookies.remove("token")
      setTimeout(() => {
        location.reload()
      }, 3000)
    }
    return Promise.reject(error.response) // 返回接口返回的错误信息
  })
//  封装get方法
export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(response => {
      resolve(response);
    }).catch(err => {
      reject(err)
    })
  })
}
// 封装post请求
export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(response => {
      resolve(response);
    }, err => {
      reject(err)
    })
  })
}
// 封装getAwait方法,返回async方法
export async function getAwait (url, params = {}) {
  let res = await axios.get(url, { params: params })
  res = res.data
  return res
}
// 封装postAwait方法,返回async方法
export async function postAwait (url, data = {}) {
  let res = await axios.post(url, data)
  res = res.data
  return res
}
// 下载
export const uploadFileRequest = () => {
  return axios({
    method: 'get',
    headers: { 'Content-Type': 'application/octet-stream' },
    url: '/api/DownloadTemplate',
    responseType: 'arraybuffer'
  })
}
// 导入
export const importFileRequest = (params) => {
  return axios({
    method: 'post',
    headers: { 'Content-Type': "multipart/form-data;" },
    url: '/api/ImportExcel',
    data: params,
  })
}


export default axios
