<template>
<div class="Login">
  <el-form label-position="top" label-width="80px" :model="formdata">
    <h2>用户登录</h2>
    <el-form-item label="用户名">
      <el-input v-model="formdata.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="formdata.password"></el-input>
    </el-form-item>
    <el-button type="primary" @click.prevent="HandleLogin()">登录</el-button>
  </el-form>
</div>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // 登录请求 async await ==>让异步操作看起来像同步操纵
    HandleLogin: async function () {
      /* this.$http.post('login', this.formdata).then(res => {
        console.log(res.data)
        const {
          data,
          meta: { msg, status }
        } = res.data
        if (status === 200) {
          console.log(data)
          // 更换路由地址,到home
          this.$router.push({ name: 'Home' })
          // 使用element-ui的消息提示
          this.$message.success(msg)
        } else {
          this.$message.warning(msg)
        }
      }) */
      const res = await this.$http.post('login', this.formdata)
      const {
        data,
        meta: { msg, status }
      } = res.data
      if (status === 200) {
        console.log(data)
        // 保存 token
        localStorage.setItem('token', data.token)
        // 更换路由地址,到home
        this.$router.push({ name: 'Home' })
        // 使用element-ui的消息提示
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    }
  }
}
</script>

<style>
.Login{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #324152;
}

.Login>form{
    width: 450px;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
}
.Login>form>h2{
    margin-bottom: 10px;
}
.Login>form>button{
    width: 100%;
    margin-top: 10px;
}
</style>
