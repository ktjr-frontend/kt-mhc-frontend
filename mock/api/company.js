const company = [{
  id: '1',
  name: '北京测试公司1'
}, {
  id: '2',
  name: '北京测试公司2'
}, {
  id: '3',
  name: '北京测试公司3'
}, {
  id: '4',
  name: '北京测试公司4'
}, {
  id: '5',
  name: '北京测试公司5'
}, {
  id: '6',
  name: '北京测试公司6'
}, {
  id: '7',
  name: '北京测试公司7'
}]

module.exports = router => {
  // 公司列表
  router.get('/company', (req, res) => {
    const name = req.query.name || ''
    let filterCompany = []
    console.log(name)
    filterCompany = company.filter(c => {
      if (!name) {
        return true
      }
      return ~c.name.indexOf(name)
    })

    res.jsonOk({
      data: filterCompany
    })
  })
}
