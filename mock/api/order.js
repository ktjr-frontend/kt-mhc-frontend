const _ = require('lodash')
const orders = [{
    number: 'G201712310001',
    frameNo: 'LMGDG5G09E106001',
    count: 4,
    id: '1',
    amount: 160000,
    provider: '宁波奥宝莱汽车有限公司',
    desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
    createDate: new Date(),
    status: '1',
    name: '测试订单'
  }, {
    number: 'G201712310002',
    frameNo: 'LMGDG5G09E106002',
    count: 4,
    id: '2',
    amount: 160000,
    provider: '宁波奥宝莱汽车有限公司',
    desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
    createDate: new Date(),
    status: '2',
    name: '测试订单'
  }, {
    number: 'G201712310003',
    frameNo: 'LMGDG5G09E106003',
    count: 4,
    id: '3',
    amount: 160000,
    provider: '宁波奥宝莱汽车有限公司',
    desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
    createDate: new Date(),
    status: '3',
    name: '测试订单'
  }, {
    number: 'G201712310004',
    frameNo: 'LMGDG5G09E106004',
    count: 4,
    id: '4',
    amount: 160000,
    provider: '宁波奥宝莱汽车有限公司',
    desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
    createDate: new Date(),
    status: '4',
    name: '测试订单'
  }
  /*, {
    number: 'G201712310005',
  frameNo: 'LMGDG5G09E106005',
    count: 4,
    id: '5',
    amount: 160000,
    provider: '宁波奥宝莱汽车有限公司',
    desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
    createDate: new Date(),
    status: '5',
    name: '测试订单'
  }*/
  , {
    number: 'G201712310006',
    frameNo: 'LMGDG5G09E106006',
    count: 4,
    id: '6',
    amount: 160000,
    provider: '宁波奥宝莱汽车有限公司',
    desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
    createDate: new Date(),
    status: '6',
    name: '测试订单'
  }, {
    number: 'G201712310007',
    frameNo: 'LMGDG5G09E106007',
    count: 4,
    id: '7',
    amount: 160000,
    provider: '宁波奥宝莱汽车有限公司',
    desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
    createDate: new Date(),
    status: '7',
    name: '测试订单'
  }, {
    number: 'G201712310008',
    frameNo: 'LMGDG5G09E106008',
    count: 4,
    id: '8',
    amount: 160000,
    provider: '宁波奥宝莱汽车有限公司',
    desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
    createDate: new Date(),
    status: '8',
    name: '测试订单'
  }, {
    number: 'G201712310009',
    frameNo: 'LMGDG5G09E106009',
    count: 4,
    id: '9',
    amount: 160000,
    provider: '宁波奥宝莱汽车有限公司',
    desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
    createDate: new Date(),
    status: '9',
    name: '测试订单'
  }, {
    number: 'G2017123100010',
    frameNo: 'LMGDG5G09E1060010',
    count: 4,
    id: '10',
    amount: 160000,
    provider: '宁波奥宝莱汽车有限公司',
    desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
    createDate: new Date(),
    status: '10',
    name: '测试订单'
  }, {
    number: 'G2017123100011',
    frameNo: 'LMGDG5G09E1060011',
    count: 4,
    id: '11',
    amount: 160000,
    provider: '宁波奥宝莱汽车有限公司',
    desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
    createDate: new Date(),
    status: '11',
    name: '测试订单'
  }, {
    number: 'G2017123100012',
    frameNo: 'LMGDG5G09E1060012',
    count: 4,
    id: '12',
    amount: 160000,
    provider: '宁波奥宝莱汽车有限公司',
    desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
    createDate: new Date(),
    status: '12',
    name: '测试订单'
  }, {
    number: 'G2017123100013',
    frameNo: 'LMGDG5G09E1060013',
    count: 4,
    id: '13',
    amount: 160000,
    provider: '宁波奥宝莱汽车有限公司',
    desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
    createDate: new Date(),
    status: '13',
    name: '测试订单'
  }, {
    number: 'G2017123100014',
    frameNo: 'LMGDG5G09E1060014',
    count: 4,
    id: '14',
    amount: 160000,
    provider: '宁波奥宝莱汽车有限公司',
    desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
    createDate: new Date(),
    status: '14',
    name: '测试订单'
  }, {
    number: 'G2017123100015',
    frameNo: 'LMGDG5G09E1060015',
    count: 4,
    id: '15',
    amount: 160000,
    provider: '宁波奥宝莱汽车有限公司',
    desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
    createDate: new Date(),
    status: '15',
    name: '测试订单'
  }, {
    number: 'G2017123100016',
    frameNo: 'LMGDG5G09E1060016',
    count: 4,
    id: '16',
    amount: 160000,
    provider: '宁波奥宝莱汽车有限公司',
    desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
    createDate: new Date(),
    status: '16',
    name: '测试订单'
  }, {
    number: 'G2017123100017',
    frameNo: 'LMGDG5G09E1060017',
    count: 4,
    id: '17',
    amount: 160000,
    provider: '宁波奥宝莱汽车有限公司',
    desc: '奥迪A3 2018款 30周周年年型 Sportback 40T',
    createDate: new Date(),
    status: '17',
    name: '测试订单'
  }
]

module.exports = router => {
  // 订单列表
  router.get('/orders', (req, res) => {
    const page = Number(req.query.page) || 1
    const size = Number(req.query.size) || 10
    const status = req.query.status || '0'
    const frameNo = req.query.frameNo
    const model = req.query.model
    const provider = req.query.provider
    const startIndex = (page - 1) * 10
    let filterOrders = []

    if (frameNo) {
      filterOrders = orders.filter(or => {
        return ~or.frameNo.indexOf(frameNo)
      })
    } else if (model) {
      filterOrders = orders.filter(or => {
        return ~or.desc.indexOf(model)
      })
    } else if (provider) {
      filterOrders = orders.filter(or => {
        return ~or.provider.indexOf(provider)
      })
    } else {
      filterOrders = orders.filter(or => {
        if (status === '0' || !status) {
          return true
        }
        return or.status === status
      })
    }

    console.log('startIndex', startIndex, 'size + startIndex', size + startIndex)
    res.jsonOk({
      result: filterOrders.slice(startIndex, size + startIndex)
    })
  })

  // 供应商列表
  router.get('/providers', (req, res) => {
    const result = [{
      id: '1',
      name: '宁波奥宝莱汽车有限公司'
    }, {
      id: '2',
      name: '北京大佬汽车有限公司'
    }, {
      id: '3',
      name: '北京宝宝汽车有限公司'
    }]

    res.jsonOk({
      result: result.filter((r) => ~r.name.indexOf(req.query.providerName))
    })
  })

  // 依据价格搜索车型
  router.get('/vehicles', (req, res) => {
    const result = [{
      id: '0',
      model: '奥迪A3 2018款 30周年年型 Sportback 35 TFSI 进取型',
      appearTrim: '白色/黑色',
      checked: false,
      iconId: '33',
      price: 13.39,
      children: [{
        checked: false,
        frameNo: 'LMGDG5G09E106001',
        appearTrim: '白色/黑色'
      }, {
        checked: false,
        frameNo: 'LMGDG5G09E106002',
        appearTrim: '白色/黑色'
      }]
    }]

    res.jsonOk({
      // result: result.filter((r) => ~r.price.toString().replace('.', '').indexOf(req.query.price))
      result: result
    })
  })
}
