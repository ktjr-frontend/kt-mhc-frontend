const messages = [{
  id: '1',
  title: '消息标题1',
  status: '1',
  message: '这里是消息的内容部分，可以很多啊，这里是消息的内容部分，可以很多啊，这里是消息的内容部分，可以很多啊，这里是消息的内容部分，可以很多啊',
  createDate: new Date()
}, {
  id: '2',
  title: '消息标题2',
  status: '2',
  message: '这里是消息的内容部分，可以很多啊，这里是消息的内容部分，可以很多啊，这里是消息的内容部分，可以很多啊，这里是消息的内容部分，可以很多啊',
  createDate: new Date()
}, {
  id: '3',
  title: '消息标题3',
  status: '2',
  message: '这里是消息的内容部分，可以很多啊，这里是消息的内容部分，可以很多啊，这里是消息的内容部分，可以很多啊，这里是消息的内容部分，可以很多啊',
  createDate: new Date()
}]

module.exports = router => {
  router.get('/messages', (req, res) => {
    const name = req.query.name || ''
    const page = Number(req.query.page) || 1
    const size = Number(req.query.size) || 10
    const startIndex = (page - 1) * 10
    let filterMessages = []
    console.log(name)
    filterMessages = messages.filter(c => {
      if (!name) {
        return true
      }
      return ~c.name.indexOf(name)
    })
    console.log('startIndex', startIndex, 'size + startIndex', size + startIndex)
    res.jsonOk({
      data: filterMessages.slice(startIndex, size + startIndex)
    })
  })
}
