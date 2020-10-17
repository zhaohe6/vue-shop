<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="头像">
            </div>
            <!-- 表单输入区 -->
            <el-form label-width="0px" class="login_form" :model="loginForm" :rules="rules" ref="loginFormRef">
                <!-- 用户名 -->
                    <el-form-item prop="userName">
                        <el-input placeholder="UserName" type="text" v-model="loginForm.userName"></el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item prop="password">
                        <el-input placeholder="password" type="password" v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item class="btns">
                        <el-button type="primary" @click="loginIn">登录</el-button>
                        <el-button type="info" @click="loginFormReset">重置</el-button>
                    </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      // 数据
      loginForm: {
        userName: '',
        password: ''
      },
      //   表单的验证规则
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginFormReset: function () {
    // 设置为空，首先为form表单绑定 ref 属性，然后为按钮绑定单击响应事件
    // loginFormRef是 为form绑定的 ref 属性的值，resetFields()是element提供的清空函数
      this.$refs.loginFormRef.resetFields()
    },
    // 表单预验证，valid是一个布尔类型的值，用来表示验证是否通过
    loginIn: function () {
      this.$refs.loginFormRef.validate(async valid => {
      // 这里的valid是true的话才会发起post请求
        if (valid) {
          // 发起一个post请求
          const result = await this.$http.post('login', this.loginForm)
          if (result.status === 200 && result.data.flag === true) {
            this.$message.success('登陆成功(>^<)')
            this.$router.push('/home')
          } else {
            this.$message.error('登陆失败，用户名或者密码错误')
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login_container{
    background-color: #2b4b6b;
    height: 100%;
    // width: 300px;
}
.login_box{
    width: 450px;
    height: 300px;
    border-radius: 3px;
    background-color: aliceblue;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.avatar_box{
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: aliceblue;
    box-shadow: 0 0 10px;
    position:absolute;
    left: 50%;
    padding: 10px;
    transform: translate(-50%,-50%);
    border: 1px wheat solid;
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px wheat solid;
    }
}
.login_form{
    position:absolute;
    bottom: 0;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
}
.btns{
    display: flex;
    justify-content: flex-end;
}
</style>
