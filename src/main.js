import Vue from 'vue'
// 引入element-ui
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
// 日期
import moment from 'moment'
import App from './App.vue'
import router from './router'

// 导入自己写的插件
import MyServerHttp from '@/plugins/https.js'
import '@/assets/css/base.css'

Vue.config.productionTip = false
// 使用element-ui组件
Vue.use(ElementUI)
// 需要使用时,可以通过this.$http.get()
Vue.use(MyServerHttp)

// 全局过滤器--处理日期格式
Vue.filter('fmtdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
