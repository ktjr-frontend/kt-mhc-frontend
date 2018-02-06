const Mock = require('mockjs')
const SECRET = require('../const.js').SECRET
const jwt = require('jsonwebtoken')
const demoImg = 'data:image/svg+xml;base64,PHN2ZyBpZD0i5Zu+5bGCXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDk5LjIgMTYiPjxzdHlsZT4uc3Qwe2ZpbGw6IzQ5NDY1MH0uc3Qxe2ZpbGw6IzE3Mzc3OH08L3N0eWxlPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04My40IDIuMmg4LjJWLjZoLTguMnYxLjZ6bTUuOSA3LjhIODhsLS41IDIuNGgtLjFMODcgMTBoLTEuM2wuNSAyLjRoLS42djEuMmgxLjJ2Mi4yaDEuNXYtMi4yaDEuMnYtMS4yaC0uNmwuNC0yLjR6TTg0IDN2NGg3LjFWM0g4NHptNS40IDIuNmgtMy44VjQuNGgzLjh2MS4yem0tNiAxMC4yaDEuN1Y5LjNoNC44djYuNWgxLjd2LThoLTguMnY4ek05OSAxMi4zaC0xLjVsLjEgMmgtMS4zdi0zLjhIOTlWMi4yaC0yLjZ2LTJoLTEuNXYyaC0yLjV2OC4zaDIuNXYzLjhoLTIuNXYxLjVoNi45bC0uMy0zLjV6bS0yLjctOC41aDEuMVY5aC0xLjFWMy44ek05NC44IDloLTFWMy44aDFWOXptLTQxLjMgMi4xaDIuOXYyLjFINTh2LTIuMWgyLjl2Mi4xaDEuN1Y0LjFoLTNsLjMtLjJjLjctLjQgMS40LS45IDIuMS0xLjVWLjZoLTkuOXYxLjZoNy44bC0uMi4xYy0xLjEuNy0yLjMgMS4zLTMuNiAxLjdsLS4zLjEtLjItMS4xaC0xLjhsLjMgMS4xaC0yLjN2OS4yaDEuN3YtMi4yek01OCA1LjVoMi45djEuNEg1OFY1LjV6bTAgMi45aDIuOXYxLjNINThWOC40em0tNC41LTIuOWgyLjl2MS40aC0yLjlWNS41em0wIDIuOWgyLjl2MS4zaC0yLjlWOC40em0tMy44LTQuMkw0OSAuNmgtMS44bC43IDMuNmgxLjh6bS42IDguNFY2LjloLTMuNXYxLjZoMS44djRjLS4yLjYtLjUgMS0uOSAxLjMtLjIuMi0uNS4zLS45LjRoLS4xdjEuNmguMWMuOS0uMiAxLjYtLjUgMi4yLTFsLjEtLjEuMS4xYy43LjkgMS45IDEgMi44IDFoMTEuMnYtMS42SDUyLjhjLTEuOCAwLTIuNS0uNC0yLjUtMS42em0yOC42LS44aC0xLjhsLS41IDIuNGgtMi41di00aDYuNlY4LjhoLTYuNlY2LjloNC4zVjUuNEg2OC4xdjEuNWg0LjN2MS45aC02LjZ2MS41aDYuNnY0aC0yLjVsLS41LTIuNGgtMS44bC41IDIuNGgtMi45djEuNmgxNnYtMS42aC0yLjhsLjUtMi41ek00MS43IDIuNGgyLjZWLjZIMjguOHYxLjhoMi45djQuOGgtMy4xVjloMy4xdjEuM2MtLjEgMi41LTIuMSAzLjgtMi44IDRWMTZjLjEgMCA0LjUtLjkgNC43LTYuMnYtLjloNi4ydjYuOWgxLjlWOC45aDIuOVY3LjFoLTIuOVYyLjR6bS0xLjggNC43aC02LjNWMi40aDYuM3Y0Ljd6TTczLjEgMmguMWMxLjggMS43IDUuMiAzLjMgNy43IDMuOGguMlY0SDgxYy0yLjQtLjUtNS40LTItNy0zLjdoLTEuNmMtMS42IDEuNi00LjYgMy4xLTcgMy43aC0uMXYxLjhoLjJjMi40LS42IDUuOC0yLjIgNy42LTMuOHoiLz48cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTQuNSAwTDkuMSA3LjlsNS40IDcuOWg4LjRWMGgtOC40ek0wIDE1LjhoOC40VjBIMHYxNS44eiIvPjwvc3ZnPg=='

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
    } else if (req.session.captcha !== parseInt(data.password, 10)) {
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
      idCard: '222012121313111111',
      name: '张三',
      businessCard: demoImg,
      workCertify: demoImg,
      nickname: '昵称', //optional 微信昵称
      desc: '我是中国人',
      email: '281231@qq.com',
      status: 'passed',
      company: {
        name: '开通金融信息服务有限公司',
        status: 'rejected',
        userName: '张三',
        idCard: '12311231131231',
        businessLicense: demoImg,
        businessCard: demoImg,
        receptionPhoto: demoImg,
        overdoorPhoto: demoImg,
        workCertify: demoImg,
        city: '北京-北京-海淀区',
        companyType: '2'
      },
      advancedCertify: { status: 'initial', grantLetter: demoImg },
      avatarURL: ''
    }))
  })
}
