var http = require('http')// eslint-disable-line no-unused-vars
var express = require('express')
var app = express()
var cors = require('cors')
var bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.json())
app.post('/login', function (req, res) {
  console.log(req.body.userName)
  console.log(req.body.password)
  if (req.body.userName === 'admin' && req.body.password === '1008611') {
    res.json({
      flag: true,
      msg: '用户名和密码正确'
    })
  } else {
    res.json({
      flag: false,
      msg: '用户名或者密码错误'
    })
  }
})
app.get('/menu', function (req, res) {
  res.json({
    data: {
      1: {
        id: 101,
        authName: '用户管理',
        path: null,
        children: [
          {
            id: 104,
            authName: '用户列表',
            path: 'user',
            children: []
          }
        ]
      },
      2: {
        id: 102,
        authName: '权限管理',
        path: null,
        children: [
          {
            id: 104,
            authName: '角色列表',
            path: 'charactor',
            children: []
          },
          {
            id: 105,
            authName: '权限列表',
            path: 'power',
            children: []
          }
        ]
      },
      3: {
        id: 103,
        authName: '商品管理',
        path: null,
        children: [
          {
            id: 106,
            authName: '商品列表',
            path: 'goods',
            children: []
          },
          {
            id: 107,
            authName: '分类参数',
            path: 'args',
            children: []
          },
          {
            id: 108,
            authName: '商品分类',
            path: 'calssify',
            children: []
          }
        ]
      },
      4: {
        id: 104,
        authName: '订单管理',
        path: null,
        children: [
          {
            id: 104,
            authName: '订单数目',
            path: 'orderCount',
            children: []
          }
        ]
      },
      5: {
        id: 105,
        authName: '数据统计',
        path: null,
        children: [
          {
            id: 104,
            authName: '总结反思',
            path: 'data',
            children: []
          }
        ]
      }
    },
    meta: {
      msg: '获取菜单列表成功',
      status: true
    }
  })
})
app.get('/users', function (req, res) {
  res.json({
    data: {
      total: 5,
      pageNum: 1,
      users: [{
        id: 25,
        userName: '范冰冰',
        mobile: '1812309871',
        type: 1,
        email: '2711122994@qq.com',
        create_time: Date.now(), // 获取当前时间
        mg_status: true, // 表示用户当前状态
        role_name: '超级管理员'
      },
      {
        id: 26,
        userName: '李晨',
        mobile: '11220018',
        type: 1,
        email: '44511224@qq.com',
        create_time: Date.now(), // 获取当前时间
        mg_status: false, // 表示用户当前状态
        role_name: '管理员'
      },
      {
        id: 27,
        userName: 'AngelBaby',
        mobile: '1502329871',
        type: 1,
        email: '67812194@qq.com',
        create_time: Date.now(), // 获取当前时间
        mg_status: true, // 表示用户当前状态
        role_name: '用户'
      },
      {
        id: 28,
        userName: '王祖蓝',
        mobile: '1501230871',
        type: 1,
        email: '8911294@qq.com',
        create_time: Date.now(), // 获取当前时间
        mg_status: false, // 表示用户当前状态
        role_name: '用户'
      },
      {
        id: 29,
        userName: '赵丽颖',
        mobile: '130882911',
        type: 1,
        email: '342819742@qq.com',
        create_time: Date.now(), // 获取当前时间
        mg_status: true, // 表示用户当前状态
        role_name: '用户'
      }]

    },
    meta: {
      msg: '获取成功',
      status: true
    }
  })
})
app.get('/charactor', function (req, res) {
  res.json({
    data: [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
        tags: ['nice', 'developer']
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 2 Lake Park, London No. 2 Lake Park',
        tags: ['loser']
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher']
      }
    ]
  })
})
app.listen('8899', function () {
  console.log('8899端口正在运行')
})
