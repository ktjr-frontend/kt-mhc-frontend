const waybills = [{
  id: '1',
  status: '1',
  number: 'YD201801010001',
  orderNumber: 'GD201801010001',
  vehicleCount: 1,
  detail: [{
    model: '奥迪 A3',
    price: 13.39,
    count: 1
  }],
  name: '开好车物流测试公司2号'
}, {
  id: '2',
  status: '1',
  number: 'YD201801010002',
  orderNumber: 'GD201801010002',
  vehicleCount: 2,
  detail: [{
    model: '奥迪 A3',
    price: 13.39,
    count: 1
  }],
  name: '开好车物流测试公司2号'
}, {
  id: '3',
  status: '2',
  number: 'YD201801010003',
  orderNumber: 'GD201801010003',
  vehicleCount: 3,
  detail: [{
    model: '奥迪 A3',
    price: 13.39,
    count: 1
  }],
  name: '开好车物流测试公司2号'
}, {
  id: '4',
  status: '3',
  number: 'YD201801010004',
  orderNumber: 'GD201801010004',
  vehicleCount: 4,
  detail: [{
    model: '奥迪 A3',
    price: 13.39,
    count: 1
  }],
  name: '开好车物流测试公司2号'
}, {
  id: '5',
  status: '4',
  number: 'YD201801010005',
  orderNumber: 'GD201801010005',
  vehicleCount: 5,
  detail: [{
    model: '奥迪 A3',
    price: 13.39,
    count: 1
  }],
  name: '开好车物流测试公司2号'
}, {
  id: '6',
  status: '4',
  number: 'YD201801010006',
  orderNumber: 'GD201801010006',
  vehicleCount: 6,
  detail: [{
    model: '奥迪 A3',
    price: 13.39,
    count: 1
  }],
  name: '开好车物流测试公司2号'
}, {
  id: '7',
  status: '2',
  number: 'YD201801010007',
  orderNumber: 'GD201801010007',
  vehicleCount: 7,
  detail: [{
    model: '奥迪 A3',
    price: 13.39,
    count: 1
  }],
  name: '开好车物流测试公司2号'
}]

const waybillVehicles = [{
  id: '1',
  model: '中规/国产 安凯客车 宝斯通',
  status: '1',
  frameNo: 'LSVHH1771123111101',
  price: 32.00,
  transportFee: 4500,
  insuranceFee: 1000,
  photos: {
    normal: {
      front: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
      back: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
      inside: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
      odometer: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
      nameBoard: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg'
    },
    exception: ['https://www.ktjr.com/static/ico/logo-vertical-new.svg']
  }
}, {
  id: '1',
  model: '中规/国产 安凯客车 宝斯通',
  status: '2',
  frameNo: 'LSVHH1771123111102',
  price: 32.00,
  transportFee: 4500,
  insuranceFee: 1000,
  photos: {
    normal: {
      front: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
      back: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
      inside: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
      odometer: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
      nameBoard: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg'
    },
    exception: ['https://www.ktjr.com/static/ico/logo-vertical-new.svg']
  }
}, {
  id: '1',
  model: '中规/国产 安凯客车 宝斯通',
  status: '3',
  frameNo: 'LSVHH1771123111103',
  price: 32.00,
  transportFee: 4500,
  insuranceFee: 1000,
  photos: {
    normal: {
      front: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
      back: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
      inside: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
      odometer: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
      nameBoard: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg'
    },
    exception: ['https://www.ktjr.com/static/ico/logo-vertical-new.svg']
  }
}, {
  id: '1',
  model: '中规/国产 安凯客车 宝斯通',
  status: '4',
  frameNo: 'LSVHH1771123111104',
  price: 32.00,
  transportFee: 4500,
  insuranceFee: 1000,
  photos: {
    normal: {
      front: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
      back: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
      inside: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
      odometer: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
      nameBoard: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg'
    },
    exception: ['https://www.ktjr.com/static/ico/logo-vertical-new.svg']
  }
}, {
  id: '1',
  model: '中规/国产 安凯客车 宝斯通',
  status: '5',
  frameNo: 'LSVHH1771123111105',
  price: 32.00,
  transportFee: 4500,
  insuranceFee: 1000,
  photos: {
    normal: {
      front: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
      back: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
      inside: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
      odometer: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
      nameBoard: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg'
    },
    exception: ['https://www.ktjr.com/static/ico/logo-vertical-new.svg']
  }
}, {
  id: '1',
  model: '中规/国产 安凯客车 宝斯通',
  status: '6',
  frameNo: 'LSVHH1771123111106',
  price: 32.00,
  transportFee: 4500,
  insuranceFee: 1000,
  photos: {
    normal: {
      front: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
      back: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
      inside: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
      odometer: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg',
      nameBoard: 'https://www.ktjr.com/static/ico/logo-vertical-new.svg'
    },
    exception: ['https://www.ktjr.com/static/ico/logo-vertical-new.svg']
  }
}]

module.exports = router => {
  // 运单列表
  router.get('/way_bills', (req, res) => {
    const page = Number(req.query.page) || 1
    const size = Number(req.query.size) || 10
    const status = req.query.status || ''
    const startIndex = (page - 1) * 10
    let filterWaybills = []

    filterWaybills = waybills.filter(c => {
      if (!status) {
        return true
      }
      return c.status === status
    })

    console.log('startIndex', startIndex, 'size + startIndex', size + startIndex)
    res.jsonOk({
      data: filterWaybills.slice(startIndex, size + startIndex)
    })
  })

  // 运单车辆列表
  router.get('/way_bill_vehicles/:id', (req, res) => {
    const page = Number(req.query.page) || 1
    const size = Number(req.query.size) || 10
    const status = req.query.status || ''
    const startIndex = (page - 1) * 10
    let filterWaybillVehicles = []

    filterWaybillVehicles = waybillVehicles.filter(c => {
      if (!status) {
        return true
      }
      return c.status === status
    })

    console.log('startIndex', startIndex, 'size + startIndex', size + startIndex)
    res.jsonOk({
      data: filterWaybillVehicles.slice(startIndex, size + startIndex)
    })
  })
}
