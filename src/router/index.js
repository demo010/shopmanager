import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login/Login.vue'
import Home from '@/components/home/Home.vue'
import UserList from '@/components/user/UserList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/userlist',
        name: 'UserList',
        component: UserList
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
