module.exports = router => {
  router.get('/regions', (req, res) => {
    res.jsonOk({
      data: [{
        'name': '北京市',
        'code': '001',
        'children': [{
          'name': '北京市',
          'code': '0011',
          'children': [{
            'name': '朝阳区',
            'code': '00111',
            'children': null,
            'parentRegionId': '2'
          }, {
            'name': '海淀区',
            'code': '00112',
            'children': null,
            'parentRegionId': '2'
          }],
          'parentRegionId': '001'
        }],
        'parentRegionId': null
      }, {
        'name': '上海市',
        'code': '002',
        'children': [{
          'name': '上海市',
          'code': '0021',
          'children': [{
            'name': '浦东区',
            'code': '00211',
            'children': null,
            'parentRegionId': '8'
          }, {
            'name': '虹桥区',
            'code': '00212',
            'children': null,
            'parentRegionId': '8'
          }],
          'parentRegionId': '002'
        }],
        'parentRegionId': null
      }]
    })
  })

  router.get('/warehouses', (req, res) => {
    console.log(req.query)
    res.jsonOk({
      data: [{
        id: 1,
        warehouseName: '测试仓库1'
      }, {
        id: 2,
        warehouseName: '测试仓库2'
      }]
    })
  })
}
