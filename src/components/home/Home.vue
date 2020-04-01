<template>
  <el-container class="container">
    <el-header class="header">
      <div class="el-logo"><img src="../../assets/image/LOGO.png" class="logo" alt="无法显示图片"></div>
      <div class="el-name"><h2>管理后台系统</h2></div>
      <div class="login-out"><a href="#">退出</a></div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
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
  left: 50px;
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
  right: 50px;
  cursor: pointer;
}
</style>
