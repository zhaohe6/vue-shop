<template>
  <div style="position: relative">
    <a-button type="primary" @click="addChar">添加用户角色</a-button>
    <template>
      <!-- rowKey来确定这个行是唯一的，他的值必须每次都是不同的，类似MySQL的主键，可以从后端获取 -->
      <a-table :columns="columns" :data-source="data" bordered class="tableBody" :rowClassName="colorChange" :rowKey="data.key">
      <a slot="name" slot-scope="text">{{ text }}</a>
      </a-table>
      <a href="www.baidu.com" id="baiduaaa">我是百度</a>
      <!-- 点击添加用户角色的时候弹出的对话框 -->
      <div class="addCharForm"  :class="{'displayStatus':addCharFromStatus}">
        <a-card title="请填写您的个人信息">
        <a-form :form="form">
        <a-form-model-item>
          <a-input placeholder="Name" v-decorator="['name']">
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input placeholder="Age" v-decorator="['age']">
            <a-icon slot="prefix" type="contacts" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input placeholder="Address" v-decorator="['address']">
            <a-icon slot="prefix" type="home" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
          <a-button type="primary" @click="disappearForm">确定</a-button>
          <a-button type="danger" @click="disappearForm">取消</a-button>
        </a-form>
        </a-card>
      </div>
    </template>
  </div>
</template>
<script>
// import Button from 'ant-design-vue/lib/button'
export default {
  data: function () {
    return {
      columns: [
        {
          title: '#',
          width: 80
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
          ellipsis: true
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address 1',
          ellipsis: true
        }
      ],
      data: [],
      addCharFromStatus: true
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
    // const content = this.form.getFieldsValue()
    // console.log(content)
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    // 'a-button': Button
  },
  created: async function () {
    const result = await this.$http.get('/charactor')
    this.data = result.data.data
    console.log(result.data.data)
  },
  mounted: function () {
  },
  methods: {
    addChar: function () {
      this.addCharFromStatus = false
    },
    disappearForm: function () {
      this.addCharFromStatus = true
      const result = this.form.getFieldsValue()
      console.log(result)
      result.key = 4
      this.data.push(result)
    },
    // 设置隔行变色
    colorChange: function (record, index) {
      let className = ''
      if (index % 2 === 1) {
        className = 'light'
      } else {
        className = 'dark'
      }
      return className
    }
  }

}
</script>
<style lang="less" scoped>
.addCharForm{
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 400px;
}
.displayStatus{
  display: none;
}
.footerBtn{
  text-align: center;
}
</style>
<style>
.light{
  background-color: wheat;
}
.dark{
  background-color: darkgray;
}

</style>
<style>
</style>
