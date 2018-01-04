const _ = require('lodash')

module.exports = router => {
  // 订单列表
  router.get('/orders', (req, res) => {
    res.jsonOk({
      result: [{
        number: 'G20171231000' + _.uniqueId(),
        count: 2,
        amount: 160000,
        provider: '宁波奥宝莱汽车有限公司',
        desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
        createDate: new Date(),
        status: '2',
        name: '测试订单'
      }, {
        number: 'G20171231000' + _.uniqueId(),
        count: 4,
        amount: 160000,
        provider: '宁波奥宝莱汽车有限公司',
        desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
        createDate: new Date(),
        status: '1',
        name: '测试订单'
      }]
    })
  })
}
