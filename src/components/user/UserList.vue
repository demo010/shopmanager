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
          <el-button slot="append" icon="el-icon-search" @click.prevent='handleQuery()'></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click.prevent="dialogFormVisibleAdd = true">添加用户</el-button>
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
        label="姓名">
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
          <el-switch v-model="scope.row.mg_state" @change="changeMgState(scope.row.id, scope.row.mg_state)"
          active-color="#13ce66" inactive-color="#ff4949" active-text="启用" inactive-text="禁用"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain type="primary" icon="el-icon-edit" circle
          @click.prevent="handleEditTipbox(scope.row.id)"></el-button>
          <el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click.prevent="handelDeleteTipBox(scope.row.id)"></el-button>
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

    <!-- 对话框组件 -->
    <!-- 点击按钮,出现对话框,用于添加用户操作 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form v-model="formAdd">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="formAdd.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="formAdd.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="formAdd.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="formAdd.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="handleAddUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 点击按钮,出现对话框,用于编辑用户数据操作 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleEdit">
      <el-form v-model="formEdit">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="formEdit.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="formEdit.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="formEdit.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="handleEditUser()">确 定</el-button>
      </div>
    </el-dialog>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      // 查询
      query: '',
      // 分页相关数据
      pagenum: 1, // 页数
      pagesize: 2, // 每页显示的条数
      total: 0, // 总条数
      // 获得用户列表数据
      userList: [],
      // 对话框
      // 1.添加用户对话框
      dialogFormVisibleAdd: false,
      // 添加用户表单数据
      // username用户名称不能为空,password用户密码不能为空,email邮箱可以为空,mobile手机号可以为空
      formAdd: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 2.编辑用户数据对话框
      dialogFormVisibleEdit: false,
      formEdit: {
        id: 0,
        username: '',
        role_id: 0,
        mobile: '',
        email: ''
      },
      formLabelWidth: '100px',
      // 获取存储的token
      AUTH_TOKEN: localStorage.getItem('token')
    }
  },
  watch: {
    // 监听输入框内容的改变,一旦输入框内容清空,则重新加载数据
    query (newVal) {
      // console.log(newVal)
      if (!newVal) {
        this.pagenum = 1
        this.getUserListData(newVal, this.pagenum, this.pagesize, false)
      }
    }
  },
  methods: {
    // 获取用户列表,
    // q->要查询的关键字; pn->页数; ps->每页条数; me->获取数据后是否需要提示框(true/false)
    async getUserListData (q, pn, ps, me) {
      // const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common.Authorization = this.AUTH_TOKEN
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

    // 添加用户操纵 -- 发送数据
    async handleAddUser () {
      console.log(this.formAdd)
      // this.$http.defaults.headers.common.Authorization = this.AUTH_TOKEN
      const res = await this.$http.post('users', this.formAdd)
      // console.log(res)
      const {
        meta: { status, msg }
      } = res.data
      // console.log(msg, status, data)
      if (status === 201) { // 添加用户成功
        this.$message.success(msg)
        this.dialogFormVisibleAdd = false // 关闭dialog
        this.getUserListData(this.query, this.pagenum, this.pagesize, false) // 重新加载数据--更新视图
        // 清除文本框数据
        this.formAdd = {}
      } else { // 添加用户失败
        this.$message.warning(msg)
      }
    },

    // 删除用户--弹出提示框+提交数据
    handelDeleteTipBox (id) {
      console.log(id)
      // const res = this.$http.delete(`users/:${id}`)
      // console.log(res)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`users/${id}`)
        console.log(res)
        // msg: "删除成功", status: 200
        const {
          meta: { msg, status }
        } = res
        // 删除成功 -- 1.提示 2.更新视图
        if (status === 200) {
          this.pagenum = 1
          this.getUserListData(this.query, this.pagenum, this.pagesize, false)

          this.$message({
            type: 'success',
            message: msg
          })
        } else { // 删除失败,提示
          this.$message({
            type: 'warning',
            message: msg
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 修改用户状态
    async changeMgState (id, state) {
      console.log(id, state)
      const res = await this.$http.put(`users/${id}/state/${state}`)
      console.log(res)
      const {
        meta: { msg, status }
      } = res.data
      if (status === 200) {
        this.$message.success(msg)
      }
    },

    // 编辑用户数据提示框
    async handleEditTipbox (id) {
      const res = await this.$http.get(`users/${id}`)
      // console.log(res.data)
      const {
        meta: { status },
        data
      } = res.data
      console.log(status, data)
      if (status === 200) {
        this.formEdit = data
      }
      this.dialogFormVisibleEdit = true
    },

    // 编辑用户数据-数据提交
    async handleEditUser () {
      const res = await this.$http.put(`users/${this.formEdit.id}`, this.formEdit)
      // console.log(res)
      const {
        meta: {
          msg, status
        }
      } = res.data
      // 更新成功--1.关闭对话框, 2.提示 3.更新视图
      if (status === 200) {
        this.dialogFormVisibleEdit = false
        this.$message.success(msg)
        this.getUserListData(this.query, this.pagenum, this.pagesize, false)
      } else {
        this.$message.warning(msg)
      }
    },

    // 分页相关方法---------
    // 每页条数改变时
    handleSizeChange (val) {
      this.pagesize = val
      this.getUserListData(this.query, this.pagenum, val, false)
    },
    // 当前页改变时
    handleCurrentChange (val) {
      this.pagenum = val
      this.getUserListData(this.query, val, this.pagesize, false)
    },
    // 查询
    handleQuery () {
      this.pagenum = 1
      this.getUserListData(this.query, this.pagenum, this.pagesize, true)
    }
  },
  created () {
    this.getUserListData(this.query, this.pagenum, this.pagesize, true)
  }
}
</script>

<style>

</style>
