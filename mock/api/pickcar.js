const letters = [{
  id: '1',
  pickContact: '张三',
  status: '1',
  model: '奥迪 A3 2017款 18T SPORT',
  count: 1,
  startDate: new Date(),
  signDate: new Date()
}, {
  id: '2',
  pickContact: '张三',
  status: '2',
  model: '奥迪 A3 2017款 18T SPORT',
  count: 1,
  startDate: new Date(),
  signDate: new Date()
}]

module.exports = router => {
  router.get('/pick_car_letters', (req, res) => {
    const name = req.query.name || ''
    const page = Number(req.query.page) || 1
    const size = Number(req.query.size) || 10
    const startIndex = (page - 1) * 10
    let filterLetters = []
    console.log(name)
    filterLetters = letters.filter(c => {
      if (!name) {
        return true
      }
      return ~c.name.indexOf(name)
    })
    console.log('startIndex', startIndex, 'size + startIndex', size + startIndex)
    res.jsonOk({
      data: filterLetters.slice(startIndex, size + startIndex)
    })
  })
}
