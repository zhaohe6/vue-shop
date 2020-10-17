<template>
  <div>
      <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- card就是白色的幕布 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="10">
                <el-input placeholder="请输入内容" clearable v-model="queryInfo.query" @clear="clear">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
        </el-col>
        <el-col :span="4" >
          <!-- click单机相应函数 直接操作data数据的值 -->
            <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
            <!-- border設施邊框，stripe設置隔行變色 -->
        <el-table :data="tableData" style="width: 100%" border stripe>
            <!-- type設置為index的時候添加序號 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="userName" label="姓名"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="mobile" label="电话"></el-table-column>
            <el-table-column prop="role_name" label="角色"></el-table-column>
            <el-table-column prop="mg_status" label="状态">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.mg_status" active-color="#13ce66" inactive-color="#ff4949" @change="statusChange(scope.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180px">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateUser(scope.row.userName)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUser"></el-button>
                    <el-tooltip placement="top" content="role setting">
                        <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- size-change 拿到最新的每页的信息数
        current-page是当前显示的页码
        page-size是每页显示多少条数据-->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pageNum"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="queryInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
    </el-card>
    <!-- 对话框 -->
    <el-dialog
      title="请填写用户信息"
      :visible.sync="dialogVisible"
      width="30%"
      @close="dialogClose">
      <el-form ref="formRef" :model="form" label-width="100px" :rules="formRules">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
</el-dialog>
<!-- 修改用户信息的对话框 -->
<el-dialog
      title="修改用户信息"
      :visible.sync="updateDialogVisible"
      width="30%">
      <el-form ref="updateRef" :model="update" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="update.newName" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="update.email"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="update.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="resetUser">确 定</el-button>
      </span>
</el-dialog>
  </div>
</template>
<script>
export default {
  data: function () {
    var checkPhone = (rule, value, callback) => {
      const boole = /^1[3456789]\d{9}$/.test(value)
      if (boole) {
        callback()
      } else {
        callback(new Error('请输入正确的手机号'))
      }
    }
    var checkEmail = (rule, value, callback) => {
      const boole = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
      if (boole) {
        callback()
      } else {
        callback(new Error('请输入正确的邮箱'))
      }
    }
    return {
      queryInfo: {
        query: '',
        pageNum: 1,
        pageSize: 2
      },
      // tableData是后端返回的所有的用户信息组成的数组
      tableData: [],
      total: null,
      dialogVisible: false,
      updateDialogVisible: false,
      newData: {
        newName: '',
        newPhone: '',
        newEmail: ''
      },
      form: {
        userName: '',
        phone: '',
        email: '',
        password: ''
      },
      update: {
        newName: '',
        email: '',
        phone: ''
      },
      formRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ]
      }
    }
  },
  //   如果在creater中需要发送ajax请求的话，不建议直接在create中写，可以将ajax封装在一个函数中
  //   然后再created中调用这个函数
  created: function () {
    this.getUserList()
  },
  mounted: function () {
  },
  methods: {
    async getUserList () {
      const result = await this.$http.get('/users',
        { params: this.queryInfo }
      )
      this.tableData = result.data.data.users
      // result.data.data.total  是后端的返回的数据的总数
      this.total = result.data.data.total
      console.log('用户信息总数为： ' + result.data.data.total)
    },
    // 监听每页显示的数据更新
    handleSizeChange: function () {

    },
    // 监听页码值改变
    handleCurrentChange: function () {

    },
    statusChange: function (arg) {
      console.log(arg)
    },
    clear: function () {
      confirm('数据已经清空')
    },
    dialogClose: function () {
      // $refs是一个对象，持有注册过 ref attribute 的所有 DOM 元素和组件实例。
      this.$refs.formRef.resetFields()
    },
    addUser: function () {
      this.$refs.formRef.validate(valid => {
        if (valid === false) {
          console.log('请填写信息')
          return ''
        } else {
          this.tableData.push({
            id: 45,
            userName: this.form.userName,
            mobile: this.form.phone,
            type: 121,
            email: this.form.email,
            create_time: Date.now(), // 获取当前时间
            mg_status: false, // 表示用户当前状态
            role_name: '超级管理员'
          })
        }
      })
      this.dialogVisible = false
    },
    updateUser: function (arg) {
      console.log(arg)
      this.updateDialogVisible = true
      this.tableData.find((value) => {
        console.log(value)
        if (arg === value.userName) {
          this.initUpdate(arg, value.mobile, value.email)
        }
      })
    },
    initUpdate: function (name, phone, email) {
      console.log(this)
      this.update.newName = name
      this.update.email = email
      this.update.phone = phone
    },
    resetUser: function () {
      this.newData.newName = this.update.newName
      this.newData.newPhone = this.update.phone
      this.newData.newEmail = this.update.email
      const name = this.update.newName
      const phone = this.update.phone
      const email = this.update.email
      // console.log(phone)这是修改之后的数据
      this.tableData.find((value) => {
        if (value.userName === name) {
          value.phone = phone
          value.email = email
          // console.log(value.phone) 这是修改之后的数据
        }
      })
      console.log(this.tableData)
      // 让对话框消失
      this.updateDialogVisible = false
    },
    removeUser: function () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.el-pagination{
  margin-top: 15px;
}
</style>
