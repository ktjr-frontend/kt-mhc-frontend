module.exports = router => {
  router.get('/vehicle/brand/list', (req, res) => {
    res.jsonOk({
      data: {
        'B': [{
          'id': 'aaaaa',
          'brandName': '宝马',
          'initials': 'B',
          'pinyin': 'baoma',
          'brandLogo': 'aaaa',
          'gmtCreated': '2018-03-12T16:28:14',
          'gmtModified': '2018-03-12T16:28:17',
          'note': null
        }, {
          'id': 'ggggg',
          'brandName': '奔驰',
          'initials': 'B',
          'pinyin': 'bengchi',
          'brandLogo': 'bbb',
          'gmtCreated': '2018-03-12T16:28:37',
          'gmtModified': '2018-03-12T16:28:40',
          'note': null
        }],
        'D': [{
          'id': 'aaaa',
          'brandName': '大众',
          'initials': 'D',
          'pinyin': 'dazong',
          'brandLogo': 'rrrr',
          'gmtCreated': '2018-03-12T16:28:52',
          'gmtModified': '2018-03-12T16:28:55',
          'note': null
        }]
      }
    })
  })

  router.get('/vehicle/series/:id', (req, res) => {
    res.jsonOk({
      data: [{
        'id': '3ee3a719ad7044f4afcc4gg3e2b07143',
        'brandName': '宝马',
        'seriesName': '宝马一系',
        'modelName': '进取进取进取2',
        'manufacturerGuidancePrice': '1300000',
        'brandLogo': 'aaaa'
      }, {
        'id': '3ee3a719ad7044f4afcc4gg3e2b07543',
        'brandName': '宝马',
        'seriesName': '宝马二系',
        'modelName': '进取进取进取1',
        'manufacturerGuidancePrice': '1300000',
        'brandLogo': 'aaaa'
      }]
    })
  })

  router.get('/vehicle/color/:brandName/:seriesName/:modelName', (req, res) => {
    res.jsonOk({
      'data': {
        'bodyColorList': [
          'adsfds',
          'ggg'
        ],
        'interiorColorList': [
          'wewe',
          'ttt'
        ]
      }
    })
  })
}
