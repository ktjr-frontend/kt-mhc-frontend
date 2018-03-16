const _ = require('lodash')
const orders = [{
    no: 'G201712310001',
    vin: 'LMGDG5G09E106001',
    vehicleNumber: 4,
    id: '1',
    loanAmount: 160000,
    supplier: '宁波奥宝莱汽车有限公司',
    brandName: '奥迪',
    seriesName: 'A3',
    modelName: '2018款 30周周年年型 Sportback 40T',
    applicationDate: new Date(),
    status: '1',
    name: '测试订单'
  }, {
    no: 'G201712310002',
    vin: 'LMGDG5G09E106002',
    vehicleNumber: 4,
    id: '2',
    loanAmount: 160000,
    supplier: '宁波奥宝莱汽车有限公司',
    brandName: '奥迪',
    seriesName: 'A3',
    modelName: '2018款 30周周年年型 Sportback 40T',
    applicationDate: new Date(),
    status: '2',
    name: '测试订单'
  }, {
    no: 'G201712310003',
    vin: 'LMGDG5G09E106003',
    vehicleNumber: 4,
    id: '3',
    loanAmount: 160000,
    supplier: '宁波奥宝莱汽车有限公司',
    brandName: '奥迪',
    seriesName: 'A3',
    modelName: '2018款 30周周年年型 Sportback 40T',
    applicationDate: new Date(),
    status: '3',
    name: '测试订单'
  }, {
    no: 'G201712310004',
    vin: 'LMGDG5G09E106004',
    vehicleNumber: 4,
    id: '4',
    loanAmount: 160000,
    supplier: '宁波奥宝莱汽车有限公司',
    brandName: '奥迪',
    seriesName: 'A3',
    modelName: '2018款 30周周年年型 Sportback 40T',
    applicationDate: new Date(),
    status: '4',
    name: '测试订单'
  }
  /*, {
    no: 'G201712310005',
  vin: 'LMGDG5G09E106005',
    vehicleNumber: 4,
    id: '5',
    loanAmount: 160000,
    supplier: '宁波奥宝莱汽车有限公司',
    brandName: '奥迪',
    seriesName: 'A3',
    modelName: '2018款 30周周年年型 Sportback 40T',
    applicationDate: new Date(),
    status: '5',
    name: '测试订单'
  }*/
  , {
    no: 'G201712310006',
    vin: 'LMGDG5G09E106006',
    vehicleNumber: 4,
    id: '6',
    loanAmount: 160000,
    supplier: '宁波奥宝莱汽车有限公司',
    brandName: '奥迪',
    seriesName: 'A3',
    modelName: '2018款 30周周年年型 Sportback 40T',
    applicationDate: new Date(),
    status: '6',
    name: '测试订单'
  }, {
    no: 'G201712310007',
    vin: 'LMGDG5G09E106007',
    vehicleNumber: 4,
    id: '7',
    loanAmount: 160000,
    supplier: '宁波奥宝莱汽车有限公司',
    brandName: '奥迪',
    seriesName: 'A3',
    modelName: '2018款 30周周年年型 Sportback 40T',
    applicationDate: new Date(),
    status: '7',
    name: '测试订单'
  }, {
    no: 'G201712310008',
    vin: 'LMGDG5G09E106008',
    vehicleNumber: 4,
    id: '8',
    loanAmount: 160000,
    supplier: '宁波奥宝莱汽车有限公司',
    brandName: '奥迪',
    seriesName: 'A3',
    modelName: '2018款 30周周年年型 Sportback 40T',
    applicationDate: new Date(),
    status: '8',
    name: '测试订单'
  }, {
    no: 'G201712310009',
    vin: 'LMGDG5G09E106009',
    vehicleNumber: 4,
    id: '9',
    loanAmount: 160000,
    supplier: '宁波奥宝莱汽车有限公司',
    brandName: '奥迪',
    seriesName: 'A3',
    modelName: '2018款 30周周年年型 Sportback 40T',
    applicationDate: new Date(),
    status: '9',
    name: '测试订单'
  }, {
    no: 'G2017123100010',
    vin: 'LMGDG5G09E1060010',
    vehicleNumber: 4,
    id: '10',
    loanAmount: 160000,
    supplier: '宁波奥宝莱汽车有限公司',
    brandName: '奥迪',
    seriesName: 'A3',
    modelName: '2018款 30周周年年型 Sportback 40T',
    applicationDate: new Date(),
    status: '10',
    name: '测试订单'
  }, {
    no: 'G2017123100011',
    vin: 'LMGDG5G09E1060011',
    vehicleNumber: 4,
    id: '11',
    loanAmount: 160000,
    supplier: '宁波奥宝莱汽车有限公司',
    brandName: '奥迪',
    seriesName: 'A3',
    modelName: '2018款 30周周年年型 Sportback 40T',
    applicationDate: new Date(),
    status: '11',
    name: '测试订单'
  }, {
    no: 'G2017123100012',
    vin: 'LMGDG5G09E1060012',
    vehicleNumber: 4,
    id: '12',
    loanAmount: 160000,
    supplier: '宁波奥宝莱汽车有限公司',
    brandName: '奥迪',
    seriesName: 'A3',
    modelName: '2018款 30周周年年型 Sportback 40T',
    applicationDate: new Date(),
    status: '12',
    name: '测试订单'
  }, {
    no: 'G2017123100013',
    vin: 'LMGDG5G09E1060013',
    vehicleNumber: 4,
    id: '13',
    loanAmount: 160000,
    supplier: '宁波奥宝莱汽车有限公司',
    brandName: '奥迪',
    seriesName: 'A3',
    modelName: '2018款 30周周年年型 Sportback 40T',
    applicationDate: new Date(),
    status: '13',
    name: '测试订单'
  }, {
    no: 'G2017123100014',
    vin: 'LMGDG5G09E1060014',
    vehicleNumber: 4,
    id: '14',
    loanAmount: 160000,
    supplier: '宁波奥宝莱汽车有限公司',
    brandName: '奥迪',
    seriesName: 'A3',
    modelName: '2018款 30周周年年型 Sportback 40T',
    applicationDate: new Date(),
    status: '14',
    name: '测试订单'
  }, {
    no: 'G2017123100015',
    vin: 'LMGDG5G09E1060015',
    vehicleNumber: 4,
    id: '15',
    loanAmount: 160000,
    supplier: '宁波奥宝莱汽车有限公司',
    brandName: '奥迪',
    seriesName: 'A3',
    modelName: '2018款 30周周年年型 Sportback 40T',
    applicationDate: new Date(),
    status: '15',
    name: '测试订单'
  }, {
    no: 'G2017123100016',
    vin: 'LMGDG5G09E1060016',
    vehicleNumber: 4,
    id: '16',
    loanAmount: 160000,
    supplier: '宁波奥宝莱汽车有限公司',
    brandName: '奥迪',
    seriesName: 'A3',
    modelName: '2018款 30周周年年型 Sportback 40T',
    applicationDate: new Date(),
    status: '16',
    name: '测试订单'
  }, {
    no: 'G2017123100017',
    vin: 'LMGDG5G09E1060017',
    vehicleNumber: 4,
    id: '17',
    loanAmount: 160000,
    supplier: '宁波奥宝莱汽车有限公司',
    brandName: '奥迪',
    seriesName: 'A3',
    modelName: '2018款 30周周年年型 Sportback 40T',
    applicationDate: new Date(),
    status: '17',
    name: '测试订单'
  }, {
    no: 'G2017123100018',
    vin: 'LMGDG5G09E1060018',
    vehicleNumber: 4,
    id: '18',
    loanAmount: 160000,
    supplier: '宁波奥宝莱汽车有限公司',
    brandName: '奥迪',
    seriesName: 'A3',
    modelName: '2018款 30周周年年型 Sportback 40T',
    applicationDate: new Date(),
    status: '18',
    name: '测试订单'
  }
]

module.exports = router => {
  // 订单列表
  router.get('/financings', (req, res) => {
    const page = Number(req.query.page) || 1
    const size = Number(req.query.size) || 10
    const status = req.query.status || '0'
    const vin = req.query.vin
    const modelName = req.query.modelName
    const supplier = req.query.supplier
    const startIndex = (page - 1) * 10
    let filterOrders = []

    if (vin) {
      filterOrders = orders.filter(or => {
        return ~or.vin.indexOf(vin)
      })
    } else if (modelName) {
      filterOrders = orders.filter(or => {
        return ~or.modelName.indexOf(modelName)
      })
    } else if (supplier) {
      filterOrders = orders.filter(or => {
        return ~or.supplier.indexOf(supplier)
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
      pageData: filterOrders.slice(startIndex, size + startIndex)
    })
  })

  // 单个订单详情
  router.get('/financings/:id', (req, res) => {
    res.jsonOk({
      data: {
        'id': '3ee3a719ad7044f4afcc4db3e2b071de',
        'type': 1,
        'no': '',
        'cashDeposit': 0,
        'deposit': 0,
        'loanAmount': 0,
        'contractAmount': 0,
        'contractNo': '',
        'supplier': '',
        'vehicleNumber': 0,
        'applicationDate': '',
        'orderStatus': '',
        'vehicles': [{
          'vin': '',
          'brandName': '',
          'seriesName': '',
          'modelName': '',
          'bodyColor': '',
          'interiorColor': '',
          'displacement': '',
          'marketPrice': 0,
          'contractPrice': 0,
          'productionDate': ''
        }],
        'payments': [{
          'type': 1,
          'financingApplicationNo': '',
          'amount': 0,
          'outAccountName': '',
          'outAccountBankCardNo': '',
          'outAccountBankName': '',
          'inAccountName': '',
          'inAccountBankCardNo': '',
          'inAccountBankName': '',
          'paymentTime': '',
          'paymentVoucher': ''
        }]
      }
    })
  })

  // 供应商列表
  router.get('/cooperators', (req, res) => {
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
      data: result.filter((r) => ~r.name.indexOf(req.query.name))
    })
  })
}
