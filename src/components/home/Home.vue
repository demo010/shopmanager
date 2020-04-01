<template>
  <el-container class="container">
    <el-header class="header">
      <div class="el-logo"><img src="../../assets/image/LOGO.png" class="logo" alt="无法显示图片"></div>
      <div class="el-name"><h2>管理后台系统</h2></div>
      <div class="login-out"><a @click.prevent="handleLoginOut()">退出</a></div>
    </el-header>
    <el-container>
    <el-aside width="200px" class="aside">
      <el-menu :default-active="$route.path" :unique-opened='true' background-color='#ffffff' active-text-color="#00ffff" router>
        <!-- 1 -->
        <el-submenu index="">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/userlist">
              <i class="el-icon-menu"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 2 -->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>权限管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-menu"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 3 -->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-menu"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 4 -->
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>订单管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 5 -->
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>数据统计</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="5-1">
              <i class="el-icon-menu"></i>
              <span>数据报表</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // 在组件渲染之前,判断是否有token
  beforeCreate () {
    // 获取localStorage中存储的token
    const token = localStorage.getItem('token')
    if (!token) {
      // 如果没有token,--> 登录
      this.$router.push({ name: 'Login' })
    }
  },
  methods: {
    // 退出登录
    handleLoginOut () {
      // 清除localStorage中token
      // window.localStorage.removeItem('token')
      localStorage.clear()
      this.$message.success('退出成功!')
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style>
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
}
.aside {
  background-color: #d3dce6;
  height: 100%;
}
.main {
  background-color: #e9eef3;
  height: 100%;
}
.el-logo,.el-name,.login-out{
  margin: 0;
  padding: 0;
  position: relative;
  height: 100%;
}
.el-logo{
  width: 16%;
}
.logo{
  width: 50px;
  height: 50px;
  position: absolute;
  top: 5px;
  left: 20px;
}
.el-name{
  width: 68%;
}
.el-name>h2{
  position: absolute;
  top: -65px;
  left: 65%;
}
.login-out>a{
  position: absolute;
  top: -100px;
  right: 20px;
  cursor: pointer;
}
</style>
