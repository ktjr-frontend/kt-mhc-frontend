export default [{
  path: '/h5/pickup_apply',
  name: 'pickCard',
  component: resolve => require(['@/views/pickup/PickCarForm.vue'], resolve),
  meta: {
    title: '提车函申请',
    tabBarVisible: false,
    skipAuth: false,
    hasFixedButtons: true,
    headerBackShow: true,
    headerShow: true
  }
}, {
  path: '/h5/interest_transfer',
  name: 'interestTransfer',
  component: resolve => require(['@/views/pickup/InterestTransfer.vue'], resolve),
  meta: {
    title: '车辆转移物权',
    tabBarVisible: false,
    skipAuth: false,
    hasFixedButtons: true,
    headerBackShow: true,
    headerShow: true
  }
}]
