<template>
<el-card class="box-card">
    <!-- 1.面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 2.搜索框+按钮 -->
    <el-row style="margin:15px 0px">
      <el-col :span='8'>
        <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary">添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 3.表格 -->
    <el-table
      :data="userList"
      style="width: 100%">
      <el-table-column
        type="index"
        label="#"
        width="60">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="80">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        label="创建时间">
        <!-- 如果单元格内显示的内容不是字符串(文本),需要给被显示的内容外层包裹一个template -->
        <!-- template内部要用数据:设置slot-scope属性,该属性的值是要用数据的数据源 -->
        <!-- slot-scope的值userList其实就是el-table绑定的数据userList;userList.row 为数组中的每个对象 -->
        <!-- 由于slot-scope自动查找userList,所以scope=userList -->
        <template slot-scope="scope">
          {{scope.row.create_time | fmtdate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state"
          active-color="#13ce66" inactive-color="#ff4949" active-text="启用" inactive-text="禁用"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template>
          <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
          <el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
          <el-button size="mini" plain type="success" icon="el-icon-check" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 4.分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top:15px">
    </el-pagination>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      // 分页相关数据
      pagenum: 1, // 页数
      pagesize: 2, // 每页显示的条数
      total: '', // 总条数
      // 获得用户列表数据
      userList: []
    }
  },
  created () {
    this.getUserListData(this.query, this.pagenum, this.pagesize, true)
  },
  methods: {
    // 获取用户列表,
    // q->要查询的关键字; pn->页数; ps->每页条数; me->获取数据后是否需要提示框(true/false)
    async getUserListData (q, pn, ps, me) {
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common.Authorization = AUTH_TOKEN
      const res = await this.$http.get(`users?query=${q}&pagenum=${pn}&pagesize=${ps}`)
      const { meta: { status, msg }, data: { users, total } } = res.data
      if (status === 200 && me) {
        this.total = total
        this.userList = users
        this.$message.success(msg)
      } else if (me) {
        this.$message.warning(msg)
      } else if (status === 200 && !me) {
        this.total = total
        this.userList = users
      }
    },
    // 分页相关方法
    // 每页条数改变时
    /* async handleSizeChange (val) {
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common.Authorization = AUTH_TOKEN
      const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${val}`)
      const { meta: { status }, data: { users } } = res.data
      if (status === 200) {
        this.userList = users
      }
    }, */
    handleSizeChange (val) {
      this.getUserListData(this.query, this.pagenum, val, false)
    },
    // 当前页改变时
    handleCurrentChange (val) {
      this.getUserListData(this.query, val, this.pagesize, false)
    }
  }
}
</script>

<style>

</style>
