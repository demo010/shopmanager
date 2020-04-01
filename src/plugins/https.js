import axios from 'axios'
// 封装了axios的插件
const MyHttpServer = {}

MyHttpServer.install = (Vue) => {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  Vue.prototype.$http = axios
}

// 导出
export default MyHttpServer
