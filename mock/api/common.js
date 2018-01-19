const Mock = require('mockjs')
const SECRET = require('../const.js').SECRET
const jwt = require('jsonwebtoken')

module.exports = router => {
  // 获取验证码
  router.get('/captcha', (req, res) => {
    req.session.captcha = Math.random().toString().slice(2, 8)
    res.jsonOk({
      captcha: req.session.captcha
    })
  })

  // 登录
  router.post('/login', (req, res) => {
    const data = req.body
    // console.log(data, req.session.captcha)
    if (Math.random() >= 1) {
      res.json({
        code: 200003 + parseInt(Math.random() * 2, 10),
        message: '用户被禁用或者状态异常'
      })
    } else if (req.session.captcha !== parseInt(data.captcha, 10)) {
      res.json({
        code: 200002,
        message: '验证码错误'
      })
    } else {
      res.jsonOk(Mock.mock({
        token: jwt.sign({ foo: 'bar' }, SECRET)
        // user: {
        //   id: '@guid',
        //   phone: 13312312311,
        //   avatarUrl: '@image("200x100", "#4A7BF7", "Hello")',
        //   'isInvited|1': true,
        //   'isNew|1': true
        // }
      }))
    }
  })

  // 登出
  router.get('/sign_out', (req, res) => {
    res.jsonOk({})
  })

  // 获取用户信息
  router.get('/users', (req, res) => {
    res.jsonOk(Mock.mock({
      id: '599794a4f87ca703c05df02d',
      phone: '13810000000',
      name: '张三',
      nickname: '昵称', //optional 微信昵称
      company: '开通金融信息服务有限公司',
      avatarURL: ''
    }))
  })
}
