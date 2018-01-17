const _ = require('lodash')
const orders = [{
  number: 'G20171231000' + _.uniqueId(),
  count: 4,
  amount: 160000,
  provider: '宁波奥宝莱汽车有限公司',
  desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
  createDate: new Date(),
  status: '1',
  name: '测试订单'
}, {
  number: 'G20171231000' + _.uniqueId(),
  count: 4,
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
  status: '3',
  name: '测试订单'
}, {
  number: 'G20171231000' + _.uniqueId(),
  count: 4,
  amount: 160000,
  provider: '宁波奥宝莱汽车有限公司',
  desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
  createDate: new Date(),
  status: '4',
  name: '测试订单'
}, {
  number: 'G20171231000' + _.uniqueId(),
  count: 4,
  amount: 160000,
  provider: '宁波奥宝莱汽车有限公司',
  desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
  createDate: new Date(),
  status: '5',
  name: '测试订单'
}, {
  number: 'G20171231000' + _.uniqueId(),
  count: 4,
  amount: 160000,
  provider: '宁波奥宝莱汽车有限公司',
  desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
  createDate: new Date(),
  status: '6',
  name: '测试订单'
}, {
  number: 'G20171231000' + _.uniqueId(),
  count: 4,
  amount: 160000,
  provider: '宁波奥宝莱汽车有限公司',
  desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
  createDate: new Date(),
  status: '7',
  name: '测试订单'
}, {
  number: 'G20171231000' + _.uniqueId(),
  count: 4,
  amount: 160000,
  provider: '宁波奥宝莱汽车有限公司',
  desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
  createDate: new Date(),
  status: '8',
  name: '测试订单'
}, {
  number: 'G20171231000' + _.uniqueId(),
  count: 4,
  amount: 160000,
  provider: '宁波奥宝莱汽车有限公司',
  desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
  createDate: new Date(),
  status: '9',
  name: '测试订单'
}, {
  number: 'G20171231000' + _.uniqueId(),
  count: 4,
  amount: 160000,
  provider: '宁波奥宝莱汽车有限公司',
  desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
  createDate: new Date(),
  status: '10',
  name: '测试订单'
}, {
  number: 'G20171231000' + _.uniqueId(),
  count: 4,
  amount: 160000,
  provider: '宁波奥宝莱汽车有限公司',
  desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
  createDate: new Date(),
  status: '11',
  name: '测试订单'
}, {
  number: 'G20171231000' + _.uniqueId(),
  count: 4,
  amount: 160000,
  provider: '宁波奥宝莱汽车有限公司',
  desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
  createDate: new Date(),
  status: '12',
  name: '测试订单'
}]

module.exports = router => {
  // 订单列表
  router.get('/orders', (req, res) => {
    const page = req.query.page || 1
    const size = req.query.size || 10
    const status = req.query.status || '0'
    const startIndex = (page - 1) * 10
    const filterOrders = orders.filter(or => {
      if (status === '0' || !status) {
        return true
      }
      return or.status === status
    })
    res.jsonOk({
      result: filterOrders.slice(startIndex, size + startIndex)
    })
  })

  // 供应商列表
  router.get('/providers', (req, res) => {
    const result = [{
      id: 1,
      name: '宁波奥宝莱汽车有限公司'
    }, {
      id: 2,
      name: '北京大佬汽车有限公司'
    }, {
      id: 3,
      name: '北京宝宝汽车有限公司'
    }]

    res.jsonOk({
      result: result.filter((r) => ~r.name.indexOf(req.query.providerName))
    })
  })

  // 依据价格搜索车型
  router.get('/vehicles', (req, res) => {
    const result = [{
      id: 0,
      model: '奥迪A3 2018款 30周年年型 Sportback 35 TFSI 进取型',
      appearTrim: '白色/黑色',
      iconId: '33',
      price: 13.39
    }]

    res.jsonOk({
      result: result.filter((r) => ~r.price.toString().replace('.', '').indexOf(req.query.price))
    })
  })
}
