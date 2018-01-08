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

  // 供应商列表
  router.get('/providers', (req, res) => {
    const result = [{
      id: 1,
      name: '青岛哈哈汽车有限公司'
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
      id: 1,
      model: '奔驰C级AMG 2010款 C 63 AMG 高性能版',
      icon: '//x.autoimg.cn/m/news/brand/36.jpg',
      price: 133.8
    }, {
      id: 2,
      model: '宝马7系 2013款 740Li xDrive',
      icon: '//x.autoimg.cn/m/news/brand/15.jpg',
      price: 133.5
    }, {
      id: 3,
      model: '高尔夫 2018款 1.6L 自动时尚型',
      icon: '//x.autoimg.cn/m/news/brand/1.jpg',
      price: 13.33
    }]

    res.jsonOk({
      result: result.filter((r) => ~r.price.toString().replace('.', '').indexOf(req.query.price))
    })
  })
}
