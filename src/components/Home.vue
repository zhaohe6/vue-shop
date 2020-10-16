<template>
    <el-container class="home_container">
        <el-header>
            <div class=".left">
                <img src="../assets/sipc.png" alt="picture">
                <span>电商系统管理后台</span>
            </div>
            <el-button type="info" @click="goback">退出</el-button>
        </el-header>
        <el-container>
            <el-aside :width="isCallpse? '64px':'200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <!-- 导航栏 -->
                <el-menu background-color="#545c64" text-color="blue" active-text-color="#ffd04b" :unique-opened="true" :collapse="isCallpse" router :default-active="myActive">
                <!-- 一级菜单 -->
                <el-submenu :index="item.id +''" v-for="item in menuList" :key="item.id">
                    <!-- 一级菜单的模板 -->
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>{{item.authName}}</span>
                    </template>
                    <!-- 二级菜单 :index表示点击这个菜单后，跳转的路径-->
                   <el-menu-item :index="item1.path + ''" :key="item1.id" v-for="item1 in item.children" @click="isActive(item1.path + '')">
                       <!-- 二级菜单的模板 -->
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item1.authName}}</span>
                        </template>
                   </el-menu-item>
                </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
  data: function () {
    return {
      menuList: [],
      isCallpse: false,
      myActive: ''
    }
  },
  //   组件被创建是调用created
  created: async function () {
    const result = await this.$http.get('/menu')
    this.menuList = result.data.data
    // console.log(this.menuList)
  },
  methods: {
    goback: function () {
      this.$router.push('./login')
    },
    toggleCollapse: function () {
      this.isCallpse = !this.isCallpse
    },
    isActive: function (arg) {
      this.myActive = arg
      console.log(arg)
    }
  }
}
</script>
<style lang="less" scoped>
.el-header{
    background-color: #373D41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    >div{
        display: flex;
        align-items: center;
    }
}
.left{
     align-items: center;
}
.el-aside{
    background-color: #333744;
}
.el-main{
     background-color: #eaedf1;
}
.home_container{
    height: 100%;
}
img{
    width: 40px;
    height: 40px;
    border-radius: 5px;
}
span{
    font-size: 25px;
    color: aliceblue;
    padding: 0 10px;
}
.toggle-button{
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>
