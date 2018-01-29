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

module.exports = router => {
  // 公司列表
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
      result: filterWaybills.slice(startIndex, size + startIndex)
    })
  })
}
